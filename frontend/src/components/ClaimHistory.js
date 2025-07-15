import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClaimHistory() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get('/api/claims')
      .then(res => setClaims(res.data))
      .catch(err => console.error('Error fetching claim history:', err));
  }, []);

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-IN', {
      hour: 'numeric',
      minute: 'numeric',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-header bg-info text-white text-center">
        <h5><i className="bi bi-clock-history"></i> Claim History</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">User</th>
              <th scope="col">Points</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim._id}>
                <td>{claim.user.name}</td>
                <td>+{claim.claimedPoints}</td>
                <td>{formatTime(claim.claimedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClaimHistory;
