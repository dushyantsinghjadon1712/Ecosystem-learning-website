from pymongo import MongoClient
from datetime import datetime

def initialize_database():
    client = MongoClient('mongodb://localhost:27017/')
    db = client.ecosystem_db
    
    print("Clearing existing data...")
    db.challenges.delete_many({})
    db.lessons.delete_many({})
    
    challenges = [
        {
            "title": "Plant a Tree",
            "description": "Plant a tree in your school or community. Take a photo and submit as proof.",
            "points": 200,
            "category": "biodiversity",
            "difficulty": "medium",
            "status": "active",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Waste Segregation Week",
            "description": "Separate wet and dry waste for 7 consecutive days. Document your process.",
            "points": 150,
            "category": "waste",
            "difficulty": "easy",
            "status": "active",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Carpool Challenge",
            "description": "Organize carpooling to school for 5 days. Get signatures from participants.",
            "points": 180,
            "category": "transport",
            "difficulty": "medium",
            "status": "active",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Plastic-Free Day",
            "description": "Spend an entire day without using single-use plastics. Share your experience.",
            "points": 120,
            "category": "waste",
            "difficulty": "easy",
            "status": "active",
            "created_at": datetime.utcnow()
        },
        {
            "title": "Energy Saver Champion",
            "description": "Reduce household electricity consumption by 10%. Submit utility bill comparison.",
            "points": 250,
            "category": "energy",
            "difficulty": "hard",
            "status": "active",
            "created_at": datetime.utcnow()
        }
    ]
    
    lessons = [
        {
            "title": "Introduction to Climate Change",
            "description": "Learn about the basics of climate change, its causes, and global impact.",
            "content": "Climate change refers to long-term shifts in global temperatures and weather patterns. Understanding this is crucial for environmental action.",
            "category": "climate",
            "duration": "15 mins",
            "points": 50,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Waste Management 101",
            "description": "Discover effective waste management techniques and recycling methods.",
            "content": "Proper waste management includes reduction, reuse, recycling, and composting. Learn how to implement these in daily life.",
            "category": "waste",
            "duration": "12 mins",
            "points": 50,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Biodiversity and Conservation",
            "description": "Explore India's rich biodiversity and conservation efforts.",
            "content": "India is home to diverse ecosystems. Protecting biodiversity ensures ecological balance and sustains life.",
            "category": "biodiversity",
            "duration": "20 mins",
            "points": 75,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Renewable Energy Sources",
            "description": "Understanding solar, wind, and other renewable energy sources.",
            "content": "Renewable energy is key to sustainable development. Learn about different types and their applications.",
            "category": "energy",
            "duration": "18 mins",
            "points": 60,
            "created_at": datetime.utcnow()
        },
        {
            "title": "Water Conservation Techniques",
            "description": "Practical methods to conserve water in daily activities.",
            "content": "Water is precious. Simple habits like fixing leaks and rainwater harvesting can save thousands of liters.",
            "category": "water",
            "duration": "10 mins",
            "points": 40,
            "created_at": datetime.utcnow()
        }
    ]
    
    print("Inserting challenges...")
    db.challenges.insert_many(challenges)
    print(f"Inserted {len(challenges)} challenges")
    
    print("Inserting lessons...")
    db.lessons.insert_many(lessons)
    print(f"Inserted {len(lessons)} lessons")
    
    print("\nDatabase initialized successfully!")
    print("You can now start the Flask application.")

if __name__ == '__main__':
    initialize_database()
