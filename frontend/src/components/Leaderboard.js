import React, { useState, useEffect } from 'react';
import { leaderboardAPI } from '../services/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await leaderboardAPI.get(20);
      setLeaderboard(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="leaderboard">
      <div className="page-header">
        <h1>🏆 Leaderboard</h1>
        <p>Top environmental champions making a difference</p>
      </div>

      {loading ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading leaderboard...</p>
        </div>
      ) : (
        <div className="card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Rank</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>School</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>EcoPoints</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr 
                    key={user.rank} 
                    style={{ 
                      borderBottom: '1px solid #F5F5F5',
                      backgroundColor: user.rank <= 3 ? '#F1F8E9' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '15px', fontWeight: '700', fontSize: '1.2rem' }}>
                      {getMedalEmoji(user.rank)}
                    </td>
                    <td style={{ padding: '15px', fontWeight: '600' }}>
                      {user.name}
                    </td>
                    <td style={{ padding: '15px', color: '#757575' }}>
                      {user.school}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right', fontWeight: '700', color: '#4CAF50', fontSize: '1.1rem' }}>
                      {user.eco_points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card" style={{ marginTop: '30px', background: 'linear-gradient(135deg, #4CAF50, #2E7D32)', color: 'white' }}>
        <h3>🌟 Keep Going!</h3>
        <p style={{ marginTop: '10px', opacity: '0.95' }}>
          Complete more challenges and lessons to climb the leaderboard. Every action counts towards a greener planet!
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;