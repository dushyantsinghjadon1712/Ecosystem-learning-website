import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Challenges from './components/Challenges';
import Leaderboard from './components/Leaderboard';
import Lessons from './components/Lessons';
import Profile from './components/Profile';
import TeacherDashboard from './components/TeacherDashboard';
import { authAPI } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.message || 'Invalid credentials'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
      school: e.target.school.value,
      grade: e.target.grade?.value || '',
    };

    try {
      await authAPI.register(formData);
      alert('Registration successful! Please login.');
      setShowLogin(true);
    } catch (error) {
      alert('Registration failed: ' + (error.response?.data?.message || 'Error'));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>🌱 EcoSystem</h1>
            <p>Gamified Environmental Learning Platform</p>
          </div>

          {showLogin ? (
            <form onSubmit={handleLogin} className="auth-form">
              <h2>Login</h2>
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <button type="submit" className="btn-primary">Login</button>
              <p className="auth-switch">
                Don't have an account?{' '}
                <span onClick={() => setShowLogin(false)}>Register</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="auth-form">
              <h2>Register</h2>
              <input type="text" name="name" placeholder="Full Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="password" name="password" placeholder="Password" required />
              <select name="role" required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <input type="text" name="school" placeholder="School/College Name" required />
              <input type="text" name="grade" placeholder="Grade/Year (optional)" />
              <button type="submit" className="btn-primary">Register</button>
              <p className="auth-switch">
                Already have an account?{' '}
                <span onClick={() => setShowLogin(true)}>Login</span>
              </p>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <h2>🌱 EcoSystem</h2>
          </div>
          <div className="nav-links">
            <Link to="/">Dashboard</Link>
            <Link to="/lessons">Lessons</Link>
            <Link to="/challenges">Challenges</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            {user?.role === 'teacher' && <Link to="/teacher">Teacher Panel</Link>}
            <Link to="/profile">Profile</Link>
          </div>
          <div className="nav-user">
            <span>🏆 {user?.eco_points || 0} Points</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile user={user} fetchProfile={fetchProfile} />} />
            {user?.role === 'teacher' && (
              <Route path="/teacher" element={<TeacherDashboard />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;