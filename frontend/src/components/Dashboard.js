import React, { useEffect, useState } from 'react';
import { leaderboardAPI, challengesAPI } from '../services/api';

function Dashboard({ user }) {
  const [recentChallenges, setRecentChallenges] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [challengesRes, leaderboardRes] = await Promise.all([
        challengesAPI.getAll(),
        leaderboardAPI.get(5)
      ]);
      setRecentChallenges(challengesRes.data.slice(0, 3));
      setTopUsers(leaderboardRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Your journey to a greener planet starts here</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{user?.eco_points || 0}</h3>
          <p>Total EcoPoints</p>
        </div>
        <div className="stat-card">
          <h3>{user?.badges?.length || 0}</h3>
          <p>Badges Earned</p>
        </div>
        <div className="stat-card">
          <h3>{recentChallenges.length}</h3>
          <p>Active Challenges</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <h2 style={{ marginBottom: '20px' }}>🎯 Featured Challenges</h2>
          {recentChallenges.map((challenge) => (
            <div key={challenge.id} className="card">
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              <div style={{ marginTop: '15px' }}>
                <span className={`badge badge-${challenge.difficulty}`}>
                  {challenge.difficulty}
                </span>
                <span style={{ marginLeft: '10px', fontWeight: '600', color: '#4CAF50' }}>
                  🏆 {challenge.points} points
                </span>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ marginBottom: '20px' }}>🏆 Top Contributors</h2>
          {topUsers.map((user, index) => (
            <div key={index} className="card" style={{ padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem' }}>#{user.rank} {user.name}</strong>
                  <p style={{ fontSize: '0.9rem', color: '#757575', margin: '5px 0' }}>
                    {user.school}
                  </p>
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#4CAF50' }}>
                  {user.eco_points}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;