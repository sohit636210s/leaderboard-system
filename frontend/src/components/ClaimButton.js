// components/ClaimButton.js

import React from 'react';
import axios from 'axios';

/**
 * Button component to trigger point claiming for selected user.
 */
function ClaimButton({ selectedUserId, onClaimComplete }) {
  const handleClaim = () => {
    if (!selectedUserId) return alert('Please select a user first');
    axios.post('/api/claimPoints', { userId: selectedUserId })
      .then(res => {
        alert(`${res.data.user.name} claimed ${res.data.points} points!`);
        onClaimComplete(); // refresh leaderboard
      })
      .catch(err => console.error('Error claiming points:', err));
  };

  return (
    <div className="text-center my-4">
      <button className="btn btn-success px-4" onClick={handleClaim}>
        <i className="bi bi-stars"></i> Claim Points
      </button>
    </div>
  );
}

export default ClaimButton;
