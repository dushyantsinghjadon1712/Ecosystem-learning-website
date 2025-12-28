import React, { useState, useEffect } from 'react';
import { lessonsAPI } from '../services/api';

function Lessons() {
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await lessonsAPI.getAll();
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    }
  };

  const handleCompleteLesson = async (lessonId) => {
    try {
      const response = await lessonsAPI.complete(lessonId);
      alert(`Lesson completed! You earned ${response.data.points_earned} points! 🎉`);
      setSelectedLesson(null);
      window.location.reload();
    } catch (error) {
      console.error('Error completing lesson:', error);
      alert('Error completing lesson');
    }
  };

  const categoryIcons = {
    climate: '🌡️',
    waste: '♻️',
    biodiversity: '🦋',
    energy: '⚡',
    water: '💧',
    general: '🌍'
  };

  return (
    <div className="lessons">
      <div className="page-header">
        <h1>📚 Interactive Lessons</h1>
        <p>Learn about environmental topics through engaging content</p>
      </div>

      {selectedLesson ? (
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button 
            onClick={() => setSelectedLesson(null)}
            style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}
          >
            ← Back to Lessons
          </button>
          <h2>{categoryIcons[selectedLesson.category]} {selectedLesson.title}</h2>
          <p style={{ color: '#757575', marginBottom: '20px' }}>
            Duration: {selectedLesson.duration} | Points: {selectedLesson.points}
          </p>
          <div style={{ lineHeight: '1.8', marginBottom: '30px' }}>
            <p>{selectedLesson.content}</p>
            <br />
            <p>This lesson covers important aspects of {selectedLesson.category} and provides 
            practical insights for environmental conservation. By understanding these concepts, 
            you can make informed decisions in your daily life that contribute to sustainability.</p>
          </div>
          <button 
            onClick={() => handleCompleteLesson(selectedLesson.id)}
            className="btn btn-success"
            style={{ width: '100%', padding: '15px' }}
          >
            Complete Lesson & Earn {selectedLesson.points} Points
          </button>
        </div>
      ) : (
        <div className="grid">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="card">
              <h3>{categoryIcons[lesson.category]} {lesson.title}</h3>
              <p>{lesson.description}</p>
              <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#757575', fontSize: '0.9rem' }}>
                  ⏱️ {lesson.duration}
                </span>
                <span style={{ fontWeight: '600', color: '#4CAF50' }}>
                  🏆 {lesson.points} points
                </span>
              </div>
              <button 
                onClick={() => setSelectedLesson(lesson)}
                className="btn btn-success"
                style={{ width: '100%', marginTop: '15px' }}
              >
                Start Learning
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Lessons;