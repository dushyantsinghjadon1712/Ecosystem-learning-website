import React, { useState, useEffect } from 'react';
import { challengesAPI } from '../services/api';

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [proofText, setProofText] = useState('');

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await challengesAPI.getAll();
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await challengesAPI.submit(selectedChallenge.id, { proof_text: proofText });
      alert('Challenge submitted successfully! Our team will review it soon. 🎉');
      setSelectedChallenge(null);
      setProofText('');
    } catch (error) {
      console.error('Error submitting challenge:', error);
      alert('Error submitting challenge');
    }
  };

  const categoryIcons = {
    biodiversity: '🌳',
    waste: '♻️',
    transport: '🚗',
    energy: '⚡',
    water: '💧',
    general: '🌍'
  };

  return (
    <div className="challenges">
      <div className="page-header">
        <h1>🎯 Eco-Challenges</h1>
        <p>Complete real-world environmental tasks and earn points</p>
      </div>

      {selectedChallenge ? (
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <button 
            onClick={() => setSelectedChallenge(null)}
            style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' }}
          >
            ← Back to Challenges
          </button>
          <h2>{categoryIcons[selectedChallenge.category]} {selectedChallenge.title}</h2>
          <p style={{ marginTop: '15px', lineHeight: '1.8' }}>{selectedChallenge.description}</p>
          <div style={{ margin: '20px 0' }}>
            <span className={`badge badge-${selectedChallenge.difficulty}`}>
              {selectedChallenge.difficulty}
            </span>
            <span style={{ marginLeft: '15px', fontSize: '1.1rem', fontWeight: '600', color: '#4CAF50' }}>
              🏆 {selectedChallenge.points} points
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Submit Your Proof</h3>
            <textarea
              value={proofText}
              onChange={(e) => setProofText(e.target.value)}
              placeholder="Describe how you completed this challenge. Include details about what you did, when, and any observations..."
              required
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '15px',
                border: '2px solid #E0E0E0',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-success"
              style={{ width: '100%', marginTop: '20px', padding: '15px' }}
            >
              Submit Challenge
            </button>
          </form>
        </div>
      ) : (
        <div className="grid">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="card">
              <h3>{categoryIcons[challenge.category]} {challenge.title}</h3>
              <p>{challenge.description}</p>
              <div style={{ marginTop: '15px' }}>
                <span className={`badge badge-${challenge.difficulty}`}>
                  {challenge.difficulty}
                </span>
                <span style={{ marginLeft: '10px', fontWeight: '600', color: '#4CAF50' }}>
                  🏆 {challenge.points} points
                </span>
              </div>
              <button 
                onClick={() => setSelectedChallenge(challenge)}
                className="btn btn-success"
                style={{ width: '100%', marginTop: '15px' }}
              >
                Accept Challenge
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Challenges;