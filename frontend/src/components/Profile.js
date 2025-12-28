import React from 'react';

function Profile({ user, fetchProfile }) {
  const badgesList = [
    { name: 'Tree Planter', icon: '🌳', description: 'Planted 5 trees' },
    { name: 'Waste Warrior', icon: '♻️', description: 'Segregated waste for 30 days' },
    { name: 'Energy Saver', icon: '⚡', description: 'Reduced energy consumption' },
    { name: 'Water Conservator', icon: '💧', description: 'Saved 1000L of water' },
  ];

  return (
    <div className="profile">
      <div className="page-header">
        <h1>👤 My Profile</h1>
        <p>Track your environmental journey</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        <div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2>{user?.name}</h2>
            <p style={{ color: '#757575', marginTop: '5px' }}>{user?.email}</p>
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#F1F8E9', 
              borderRadius: '8px' 
            }}>
              <h3 style={{ color: '#4CAF50', fontSize: '2rem' }}>{user?.eco_points || 0}</h3>
              <p style={{ color: '#2E7D32' }}>Total EcoPoints</p>
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h3>📋 Details</h3>
            <div style={{ marginTop: '15px' }}>
              <p style={{ marginBottom: '10px' }}>
                <strong>Role:</strong> {user?.role}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>School:</strong> {user?.school || 'Not specified'}
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Grade:</strong> {user?.grade || 'Not specified'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>🏅 Badges & Achievements</h3>
            <p style={{ color: '#757575', marginBottom: '20px' }}>
              Earn badges by completing challenges and lessons
            </p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {badgesList.map((badge, index) => (
                <div 
                  key={index}
                  style={{
                    padding: '20px',
                    border: '2px solid #E0E0E0',
                    borderRadius: '12px',
                    textAlign: 'center',
                    opacity: user?.badges?.includes(badge.name) ? 1 : 0.4
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{badge.icon}</div>
                  <h4>{badge.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#757575', marginTop: '5px' }}>
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: '20px' }}>
            <h3>📊 Impact Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginTop: '20px' }}>
              <div style={{ padding: '15px', background: '#E8F5E9', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.9rem', color: '#2E7D32' }}>CO₂ Saved</p>
                <h3 style={{ color: '#1B5E20', marginTop: '5px' }}>24 kg</h3>
              </div>
              <div style={{ padding: '15px', background: '#E3F2FD', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.9rem', color: '#1565C0' }}>Water Saved</p>
                <h3 style={{ color: '#0D47A1', marginTop: '5px' }}>450 L</h3>
              </div>
              <div style={{ padding: '15px', background: '#FFF9C4', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.9rem', color: '#F57F17' }}>Trees Planted</p>
                <h3 style={{ color: '#F57F17', marginTop: '5px' }}>8</h3>
              </div>
              <div style={{ padding: '15px', background: '#F3E5F5', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.9rem', color: '#6A1B9A' }}>Waste Recycled</p>
                <h3 style={{ color: '#4A148C', marginTop: '5px' }}>32 kg</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;