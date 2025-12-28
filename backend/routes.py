from flask import request, jsonify
from bson import ObjectId
import bcrypt
import jwt
from datetime import datetime, timedelta
from functools import wraps

def register_routes(app, db):
    
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'message': 'Token is missing!'}), 401
            try:
                token = token.split()[1]
                data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
                current_user = db.users.find_one({"_id": ObjectId(data['user_id'])})
            except:
                return jsonify({'message': 'Token is invalid!'}), 401
            return f(current_user, *args, **kwargs)
        return decorated
    
    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.json
        
        if db.get_user_by_email(data['email']):
            return jsonify({'message': 'Email already registered'}), 400
        
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            'name': data['name'],
            'email': data['email'],
            'password': hashed_password,
            'role': data.get('role', 'student'),
            'school': data.get('school', ''),
            'grade': data.get('grade', ''),
        }
        
        result = db.create_user(user_data)
        return jsonify({'message': 'User registered successfully', 'user_id': str(result.inserted_id)}), 201
    
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.json
        user = db.get_user_by_email(data['email'])
        
        if not user:
            return jsonify({'message': 'Invalid credentials'}), 401
        
        if bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
            token = jwt.encode({
                'user_id': str(user['_id']),
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, app.config['JWT_SECRET_KEY'], algorithm='HS256')
            
            return jsonify({
                'token': token,
                'user': {
                    'id': str(user['_id']),
                    'name': user['name'],
                    'email': user['email'],
                    'role': user['role'],
                    'eco_points': user.get('eco_points', 0)
                }
            }), 200
        
        return jsonify({'message': 'Invalid credentials'}), 401
    
    @app.route('/api/user/profile', methods=['GET'])
    @token_required
    def get_profile(current_user):
        return jsonify({
            'id': str(current_user['_id']),
            'name': current_user['name'],
            'email': current_user['email'],
            'role': current_user['role'],
            'school': current_user.get('school', ''),
            'grade': current_user.get('grade', ''),
            'eco_points': current_user.get('eco_points', 0),
            'badges': current_user.get('badges', [])
        }), 200
    
    @app.route('/api/leaderboard', methods=['GET'])
    def get_leaderboard():
        limit = request.args.get('limit', 10, type=int)
        leaderboard = db.get_leaderboard(limit)
        
        result = []
        for idx, user in enumerate(leaderboard, 1):
            result.append({
                'rank': idx,
                'name': user['name'],
                'school': user.get('school', 'Unknown'),
                'eco_points': user.get('eco_points', 0)
            })
        
        return jsonify(result), 200
    
    @app.route('/api/challenges', methods=['GET'])
    @token_required
    def get_challenges(current_user):
        challenges = db.get_active_challenges()
        result = []
        for challenge in challenges:
            result.append({
                'id': str(challenge['_id']),
                'title': challenge['title'],
                'description': challenge['description'],
                'points': challenge['points'],
                'category': challenge.get('category', 'general'),
                'difficulty': challenge.get('difficulty', 'medium'),
                'deadline': challenge.get('deadline', '')
            })
        return jsonify(result), 200
    
    @app.route('/api/challenges/<challenge_id>/submit', methods=['POST'])
    @token_required
    def submit_challenge(current_user, challenge_id):
        data = request.json
        
        submission_data = {
            'user_id': current_user['_id'],
            'challenge_id': ObjectId(challenge_id),
            'proof_text': data.get('proof_text', ''),
            'proof_image_url': data.get('proof_image_url', '')
        }
        
        db.submit_challenge(submission_data)
        return jsonify({'message': 'Challenge submitted successfully'}), 201
    
    @app.route('/api/lessons', methods=['GET'])
    @token_required
    def get_lessons(current_user):
        lessons = db.get_all_lessons()
        result = []
        for lesson in lessons:
            result.append({
                'id': str(lesson['_id']),
                'title': lesson['title'],
                'description': lesson['description'],
                'content': lesson.get('content', ''),
                'category': lesson.get('category', 'general'),
                'duration': lesson.get('duration', '10 mins'),
                'points': lesson.get('points', 50)
            })
        return jsonify(result), 200
    
    @app.route('/api/lessons/<lesson_id>/complete', methods=['POST'])
    @token_required
    def complete_lesson(current_user, lesson_id):
        lesson = db.lessons.find_one({"_id": ObjectId(lesson_id)})
        if lesson:
            points = lesson.get('points', 50)
            db.update_user_points(current_user['_id'], points)
            return jsonify({'message': 'Lesson completed', 'points_earned': points}), 200
        return jsonify({'message': 'Lesson not found'}), 404
    
    @app.route('/api/teacher/challenges', methods=['POST'])
    @token_required
    def create_challenge(current_user):
        if current_user.get('role') != 'teacher':
            return jsonify({'message': 'Unauthorized'}), 403
        
        data = request.json
        challenge_data = {
            'title': data['title'],
            'description': data['description'],
            'points': data.get('points', 100),
            'category': data.get('category', 'general'),
            'difficulty': data.get('difficulty', 'medium'),
            'status': 'active',
            'created_by': current_user['_id']
        }
        
        result = db.add_challenge(challenge_data)
        return jsonify({'message': 'Challenge created', 'id': str(result.inserted_id)}), 201
    
    @app.route('/api/teacher/students', methods=['GET'])
    @token_required
    def get_students(current_user):
        if current_user.get('role') != 'teacher':
            return jsonify({'message': 'Unauthorized'}), 403
        
        students = list(db.users.find(
            {"role": "student", "school": current_user.get('school')},
            {"name": 1, "email": 1, "eco_points": 1, "grade": 1}
        ))
        
        result = []
        for student in students:
            result.append({
                'id': str(student['_id']),
                'name': student['name'],
                'email': student['email'],
                'grade': student.get('grade', ''),
                'eco_points': student.get('eco_points', 0)
            })
        
        return jsonify(result), 200
