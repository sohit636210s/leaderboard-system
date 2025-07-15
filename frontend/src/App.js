import React, { useState } from 'react';

// Importing core UI components
import UserDropdown from './components/UserDropdown';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory'; // For displaying claim logs

/**
 * Main App component — handles global state and renders all core sections:
 * - User selection and creation
 * - Claiming points for selected user
 * - Displaying leaderboard and claim history
 */
function App() {
  // Stores the selected user's MongoDB ID
  const [selectedUserId, setSelectedUserId] = useState('');

  // Triggers component re-render when user claims points
  const [refresh, setRefresh] = useState(false);

  // Called after claim to refresh leaderboard and claim history
  const handleClaimComplete = () => {
    setRefresh(prev => !prev); // Toggles state to re-render dependent components
  };

  return (
    <>
      {/* Top navbar with app branding */}
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container-fluid justify-content-center">
          <span className="navbar-brand mb-0 h1">Leaderboard System</span>
        </div>
      </nav>

      <div className="container my-4">
        {/* Page heading with icon */}
        <h2 className="text-center mb-4">
          <i className="bi bi-lightning-charge-fill text-warning"></i> Leaderboard Challenge
        </h2>

        {/* Dropdown for selecting existing users and adding new ones */}
        <UserDropdown
          onUserSelect={setSelectedUserId}
          selectedUserId={selectedUserId}
        />

        {/* Button to claim random points for selected user */}
        <ClaimButton
          selectedUserId={selectedUserId}
          onClaimComplete={handleClaimComplete}
        />

        {/* Display leaderboard — shows sorted users by points */}
        <Leaderboard key={refresh} />

        {/* Display recent claim history — shows timestamped point claims */}
        <ClaimHistory key={`claim-${refresh}`} />
      </div>
    </>
  );
}

export default App;
