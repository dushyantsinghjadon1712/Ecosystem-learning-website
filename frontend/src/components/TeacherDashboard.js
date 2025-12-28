import React, { useState, useEffect } from 'react';
import { teacherAPI } from '../services/api';

function TeacherDashboard() {
  const [students, setStudents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await teacherAPI.getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      points: parseInt(e.target.points.value),
      category: e.target.category.value,
      difficulty: e.target.difficulty.value,
    };

    try {
      await teacherAPI.createChallenge(formData);
      alert('Challenge created successfully! 🎉');
      setShowCreateForm(false);
      e.target.reset();
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('Error creating challenge');
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="page-header">
        <h1>👨‍🏫 Teacher Dashboard</h1>
        <p>Manage challenges and track student progress</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>📝 Create New Challenge</h2>
              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="btn btn-success"
              >
                {showCreateForm ? 'Cancel' : '+ New Challenge'}
              </button>
            </div>

            {showCreateForm && (
              <form onSubmit={handleCreateChallenge} style={{ marginTop: '20px' }}>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Challenge Title" 
                  required 
                  style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '2px solid #E0E0E0', borderRadius: '8px' }}
                />
                <textarea 
                  name="description" 
                  placeholder="Challenge Description" 
                  required
                  style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '2px solid #E0E0E0', borderRadius: '8px', minHeight: '100px' }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '15px' }}>
                  <input 
                    type="number" 
                    name="points" 
                    placeholder="Points" 
                    required 
                    style={{ padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px' }}
                  />
                  <select 
                    name="category" 
                    required
                    style={{ padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px' }}
                  >
                    <option value="general">General</option>
                    <option value="waste">Waste</option>
                    <option value="energy">Energy</option>
                    <option value="water">Water</option>
                    <option value="biodiversity">Biodiversity</option>
                    <option value="transport">Transport</option>
                  </select>
                  <select 
                    name="difficulty" 
                    required
                    style={{ padding: '12px', border: '2px solid #E0E0E0', borderRadius: '8px' }}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
                  Create Challenge
                </button>
              </form>
            )}
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h2>📊 Student Progress</h2>
            <div style={{ overflowX: 'auto', marginTop: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Grade</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>EcoPoints</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} style={{ borderBottom: '1px solid #F5F5F5' }}>
                      <td style={{ padding: '12px' }}>{student.name}</td>
                      <td style={{ padding: '12px', color: '#757575' }}>{student.grade}</td>
                      <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#4CAF50' }}>
                        {student.eco_points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
            <h3>📈 Statistics</h3>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ opacity: '0.9' }}>Total Students</p>
                <h2 style={{ marginTop: '5px' }}>{students.length}</h2>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <p style={{ opacity: '0.9' }}>Total Points Earned</p>
                <h2 style={{ marginTop: '5px' }}>
                  {students.reduce((sum, s) => sum + s.eco_points, 0)}
                </h2>
              </div>
              <div>
                <p style={{ opacity: '0.9' }}>Average Points</p>
                <h2 style={{ marginTop: '5px' }}>
                  {students.length > 0 
                    ? Math.round(students.reduce((sum, s) => sum + s.eco_points, 0) / students.length)
                    : 0
                  }
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;