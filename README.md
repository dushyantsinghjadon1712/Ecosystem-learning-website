# 🌱 EcoSystem - Gamified Environmental Learning Platform

This is a **complete full-stack web application** for environmental education with gamification.

---

## 📋 Project Information

**Project Name:** EcoSystem  
**Category:** Full-Stack Web Development  
**Tech Stack:** React.js + Python Flask + MongoDB  

---

## ✨ Features

### For Students
- ✅ Interactive lessons on environmental topics (5 pre-loaded)
- ✅ Real-world eco-challenges with proof submission
- ✅ Points and badges system for gamification
- ✅ Leaderboard to compete with peers
- ✅ Personal profile with impact tracking
- ✅ Beautiful, responsive UI

### For Teachers
- ✅ Teacher dashboard to monitor students
- ✅ Create custom challenges for students
- ✅ View student progress and statistics
- ✅ School-wide analytics

---

## 🛠️ Technology Stack

**Frontend:**
- React 18.2.0
- React Router DOM 6.20.0
- Axios 1.6.2
- Custom CSS

**Backend:**
- Flask 3.0.0
- PyMongo 4.6.0
- JWT Authentication
- Bcrypt for password hashing

**Database:**
- MongoDB (NoSQL)

---

## 📁 Project Structure

```
EcoSystem/
├── backend/
│   ├── app.py              # Main Flask app
│   ├── config.py           # Configuration
│   ├── models.py           # Database models
│   ├── routes.py           # API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── database/
│       └── init_db.py      # Sample data initialization
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styles
│   │   ├── index.js        # Entry point
│   │   ├── components/     # React components
│   │   │   ├── Dashboard.js
│   │   │   ├── Lessons.js
│   │   │   ├── Challenges.js
│   │   │   ├── Leaderboard.js
│   │   │   ├── Profile.js
│   │   │   └── TeacherDashboard.js
│   │   └── services/
│   │       └── api.js      # API integration
│   └── package.json
│
├── SETUP.md                # Setup instructions
└── README.md               # This file
```

---

## 🚀 How to Run

### Prerequisites
1. Python 3.8+
2. Node.js 16+
3. MongoDB

### Quick Start

See **SETUP.md** for detailed step-by-step instructions.

**In short:**

1. **Start MongoDB**
2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   python database/init_db.py
   python app.py
   ```
3. **Frontend Setup (New Terminal):**
   ```bash
   cd frontend
   npm install
   npm start
   ```
4. **Open http://localhost:3000**

---

## 📚 Pre-loaded Sample Data

### 5 Lessons:
1. Introduction to Climate Change (50 points)
2. Waste Management 101 (50 points)
3. Biodiversity and Conservation (75 points)
4. Renewable Energy Sources (60 points)
5. Water Conservation Techniques (40 points)

### 5 Challenges:
1. Plant a Tree (200 points, Medium)
2. Waste Segregation Week (150 points, Easy)
3. Carpool Challenge (180 points, Medium)
4. Plastic-Free Day (120 points, Easy)
5. Energy Saver Champion (250 points, Hard)

---

## 🎯 How to Test

1. **Register** as a student with any email/password
2. **Login** and explore the dashboard
3. **Complete a lesson** - click Lessons → Start Learning → Complete
4. **Accept a challenge** - click Challenges → Accept Challenge → Submit proof
5. **Check leaderboard** - see your ranking
6. **View profile** - see your badges and stats

For teacher features:
1. **Register** as a teacher
2. **Login** and go to Teacher Panel
3. **Create a custom challenge**
4. **View student list**

---

## 📊 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `GET /api/lessons` - Get all lessons
- `POST /api/lessons/<id>/complete` - Complete lesson
- `GET /api/challenges` - Get challenges
- `POST /api/challenges/<id>/submit` - Submit challenge
- `GET /api/leaderboard` - Get leaderboard
- `POST /api/teacher/challenges` - Create challenge (teacher only)
- `GET /api/teacher/students` - Get students (teacher only)

---

## 🌍 Problem Statement

Environmental education in India lacks engaging, hands-on experiences. Students don't understand real-world impact or feel motivated to adopt sustainable habits.

## 💡 Solution

EcoSystem gamifies environmental learning through:
- Interactive lessons
- Real-world challenges
- Points, badges, and leaderboards
- Impact tracking
- Teacher monitoring tools

---

## 📖 Documentation Included

1. **SETUP.md** - Complete setup guide
2. **README.md** - This overview
3. **Installation-Setup-Guide.pdf** - Detailed PDF guide
4. **Complete-Project-Guide.pdf** - Full project documentation
5. **Inline code comments** - Throughout the codebase

---

## ✅ What's Included

- ✅ Complete source code (backend + frontend)
- ✅ Database initialization scripts
- ✅ Sample data (5 lessons, 5 challenges)
- ✅ User authentication (JWT)
- ✅ Responsive UI design
- ✅ Documentation (PDF + MD files)
- ✅ Ready to run and demonstrate

---

## 🎓 For Your Teacher

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database integration (MongoDB)
- User authentication and security
- React component architecture
- Responsive UI/UX design
- Real-world problem solving

---

## 🐛 Troubleshooting

If you encounter issues:
1. Check **SETUP.md** for solutions
2. Ensure MongoDB is running
3. Verify both backend and frontend are running
4. Check terminal for error messages

Common fixes:
- **PowerShell script error:** Run as admin and set execution policy
- **Module not found:** Activate virtual environment
- **npm errors:** Clear cache with `npm cache clean --force`

---

## 📞 Support

All instructions are in **SETUP.md**. Follow them step-by-step for a smooth setup.

---

## 🏆 Project Status

**Status:** ✅ Complete and Ready for Submission

**Tested on:**
- Windows 10/11
- Python 3.8+
- Node.js 16+
- MongoDB 6.0+

---

## 📄 License

Created for educational purposes as a college project.

---

**Made with 💚 for a Greener Planet**

*"Every small action counts towards environmental sustainability"* 🌱

---

## 👨‍💻 Quick Commands Reference

```bash
# Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python database/init_db.py
python app.py

# Frontend (new terminal)
cd frontend
npm install
npm start
```

---
