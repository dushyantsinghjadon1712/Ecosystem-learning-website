from pymongo import MongoClient
from datetime import datetime
import bcrypt

class Database:
    def __init__(self, uri):
        self.client = MongoClient(uri)
        self.db = self.client.ecosystem_db

        # Collections
        self.users = self.db.users
        self.challenges = self.db.challenges
        self.lessons = self.db.lessons
        self.submissions = self.db.submissions
        self.achievements = self.db.achievements

    def get_user_by_email(self, email):
        return self.users.find_one({"email": email})

    def create_user(self, user_data):
        user_data['created_at'] = datetime.utcnow()
        user_data['eco_points'] = 0
        user_data['badges'] = []
        return self.users.insert_one(user_data)

    def update_user_points(self, user_id, points):
        return self.users.update_one(
            {"_id": user_id},
            {"$inc": {"eco_points": points}}
        )

    def get_leaderboard(self, limit=10):
        return list(self.users.find(
            {},
            {"name": 1, "email": 1, "eco_points": 1, "school": 1}
        ).sort("eco_points", -1).limit(limit))

    def add_challenge(self, challenge_data):
        challenge_data['created_at'] = datetime.utcnow()
        return self.challenges.insert_one(challenge_data)

    def get_active_challenges(self):
        return list(self.challenges.find({"status": "active"}))

    def submit_challenge(self, submission_data):
        submission_data['submitted_at'] = datetime.utcnow()
        submission_data['status'] = 'pending'
        return self.submissions.insert_one(submission_data)

    def add_lesson(self, lesson_data):
        lesson_data['created_at'] = datetime.utcnow()
        return self.lessons.insert_one(lesson_data)

    def get_all_lessons(self):
        return list(self.lessons.find())
