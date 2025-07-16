import React, { useState, useEffect } from 'react';
import axios from 'axios';

// ✅ Define BASE_URL for deployed backend
const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Component for displaying a dropdown to select existing users.
 * Also allows adding a new user using an input field.
 * Displays selected user's MongoDB ID below the input.
 */
function UserDropdown({ onUserSelect, selectedUserId }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  // ✅ Fetch users from deployed backend
  useEffect(() => {
    axios.get(`${BASE_URL}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  // ✅ Add new user to backend database
  const handleAddUser = () => {
    if (newUser.trim() === '') return;
    axios.post(`${BASE_URL}/api/addUser`, { name: newUser })
      .then(res => {
        setUsers(prev => [res.data.user, ...prev]);
        setNewUser('');
      })
      .catch(err => console.error('Error adding user:', err));
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">Select User:</label>
      <select className="form-select" onChange={(e) => onUserSelect(e.target.value)}>
        <option value="">Choose a user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>

      {/* Add new user input */}
      <div className="input-group mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddUser}>
          <i className="bi bi-person-plus"></i> Add User
        </button>
      </div>

      {/* Show selected user ID below */}
      {selectedUserId && (
        <div className="mt-3">
          <span className="text-muted">
            <strong>User ID:</strong> {selectedUserId}
          </span>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
