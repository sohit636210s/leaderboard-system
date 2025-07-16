import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ⭐ Define BASE_URL for deployed backend
const BASE_URL = process.env.REACT_APP_API_URL;

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ⭐ Use full backend URL for Netlify compatibility
    axios.get(`${BASE_URL}/api/leaderboard`)
      .then(res => setData(res.data))
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        // ⭐ Optional alert for feedback
        alert('Unable to load leaderboard. Please try again later.');
      });
  }, []);

  const maskId = (id) => {
    if (!id || id.length < 2) return id;
    return id[0] + '*'.repeat(id.length - 2) + id[id.length - 1];
  };

  return (
    <div className="container px-3">
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-success text-white text-center">
          <h5><i className="bi bi-trophy-fill"></i> Leaderboard</h5>
        </div>
        <ul className="list-group list-group-flush">
          {data.map((user, index) => (
            <li
              key={user._id}
              className="list-group-item d-flex flex-wrap align-items-center justify-content-between"
            >
              {/* DP and Info */}
              <div className="d-flex align-items-center flex-grow-1 me-2">
                <img
                  src="/dp.jpg"
                  alt="user"
                  className="rounded-circle me-3"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <div>
                  <div className="fw-bold">{index + 1}. {user.name}</div>
                  <div className="text-muted small">ID: {maskId(user._id)}</div>
                </div>
              </div>

              {/* Points + Star */}
              <div className="d-flex align-items-center mt-2 mt-sm-0">
                <span className="fw-semibold me-2">{user.totalPoints} pts</span>
                <img
                  src="/star.jpg"
                  alt="star"
                  style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
