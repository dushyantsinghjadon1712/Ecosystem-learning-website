import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/user/profile'),
};

// Challenges API
export const challengesAPI = {
  getAll: () => api.get('/challenges'),
  submit: (challengeId, data) => api.post(`/challenges/${challengeId}/submit`, data),
};

// Lessons API
export const lessonsAPI = {
  getAll: () => api.get('/lessons'),
  complete: (lessonId) => api.post(`/lessons/${lessonId}/complete`),
};

// Leaderboard API
export const leaderboardAPI = {
  get: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
};

// Teacher API
export const teacherAPI = {
  createChallenge: (challengeData) => api.post('/teacher/challenges', challengeData),
  getStudents: () => api.get('/teacher/students'),
};

export default api;