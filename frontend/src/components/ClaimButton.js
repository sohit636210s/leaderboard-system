// components/ClaimButton.js

import React from 'react';
import axios from 'axios';

//  Define BASE_URL for deployed backend
const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Button component to trigger point claiming for selected user.
 */
function ClaimButton({ selectedUserId, onClaimComplete }) {
  const handleClaim = () => {
    if (!selectedUserId) return alert('Please select a user first');

    //  Update API call to use full backend URL
    axios.post(`${BASE_URL}/api/claimPoints`, { userId: selectedUserId })
      .then(res => {
        alert(`${res.data.user.name} claimed ${res.data.points} points!`);
        onClaimComplete(); // refresh leaderboard
      })
      .catch(err => {
        //  Optional: Show alert on error
        console.error('Error claiming points:', err);
        alert('Something went wrong while claiming points!');
      });
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
