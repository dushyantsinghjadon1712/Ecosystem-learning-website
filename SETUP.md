# EcoSystem - Setup Instructions

## Quick Start Guide

### Prerequisites
Before you begin, make sure you have installed:
- **Python 3.8+** (Download from python.org)
- **Node.js 16+** (Download from nodejs.org)
- **MongoDB** (Download from mongodb.com)

---

## Step 1: Start MongoDB

### Windows
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB Server" and start it

### macOS
```bash
brew services start mongodb-community
```

### Linux
```bash
sudo systemctl start mongod
```

---

## Step 2: Setup Backend

1. Open **Command Prompt** or **Terminal**
2. Navigate to the backend folder:
```bash
cd EcoSystem/backend
```

3. Create a virtual environment:
```bash
python -m venv venv
```

4. Activate the virtual environment:

**Windows (Command Prompt):**
```bash
venv\Scripts\activate.bat
```

**Windows (PowerShell - if you get script execution error):**
First run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then activate:
```powershell
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

5. Install Python dependencies:
```bash
pip install -r requirements.txt
```

6. Initialize the database with sample data:
```bash
python database/init_db.py
```

You should see:
```
Clearing existing data...
Inserting challenges...
Inserted 5 challenges
Inserting lessons...
Inserted 5 lessons

Database initialized successfully!
```

7. Start the Flask backend:
```bash
python app.py
```

The backend will run on **http://localhost:5000**

---

## Step 3: Setup Frontend

1. Open a **NEW** terminal/command prompt (keep backend running)
2. Navigate to the frontend folder:
```bash
cd EcoSystem/frontend
```

3. Install Node.js dependencies:
```bash
npm install
```

This will install React, React Router, Axios, and other dependencies.

4. Start the React development server:
```bash
npm start
```

The frontend will automatically open in your browser at **http://localhost:3000**

---

## Step 4: Use the Application

### Register a Student Account
1. Click "Register" on the login page
2. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: yourpassword
   - Role: **Student**
   - School: Your school name
   - Grade: Your grade/year
3. Click "Register"
4. You'll see "Registration successful! Please login."

### Login
1. Enter your email and password
2. Click "Login"
3. You'll see the Dashboard!

### Try the Features
- **Dashboard**: See your points and featured challenges
- **Lessons**: Click on any lesson, read it, complete it to earn points
- **Challenges**: Accept a challenge, complete it in real life, submit proof
- **Leaderboard**: See your ranking among all students
- **Profile**: View your badges and environmental impact

### Register a Teacher Account (Optional)
1. Logout
2. Register again with Role: **Teacher**
3. Login as teacher
4. Access "Teacher Panel" to create challenges and view students

---

## Troubleshooting

### Problem: MongoDB not running
**Solution:** Start MongoDB service as shown in Step 1

### Problem: pip install fails
**Solution:** 
```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Problem: npm install fails
**Solution:**
```bash
npm cache clean --force
npm install
```

### Problem: Backend error "Module not found"
**Solution:** Make sure virtual environment is activated (you should see `(venv)` in your terminal)

### Problem: Frontend can't connect to backend
**Solution:** Make sure backend is running on port 5000

---

## Running the Project Later

Every time you want to run the project:

### Terminal 1 - Backend:
```bash
cd EcoSystem/backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # macOS/Linux
python app.py
```

### Terminal 2 - Frontend:
```bash
cd EcoSystem/frontend
npm start
```

---

## Need Help?

Check the following:
1. MongoDB is running
2. Backend shows no errors in terminal
3. Frontend is on http://localhost:3000
4. Backend is on http://localhost:5000

If you see any errors, read them carefully - they usually tell you what's wrong!

---

**You're all set! Happy learning! 🌱**
