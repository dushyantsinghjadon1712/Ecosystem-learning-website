from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models import Database
from routes import register_routes

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

# Initialize database
db = Database(app.config['MONGO_URI'])

# Register routes
register_routes(app, db)

@app.route('/')
def index():
    return jsonify({
        "message": "EcoSystem API",
        "version": "1.0.0",
        "status": "running"
    })

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
