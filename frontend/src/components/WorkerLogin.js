import React, { useState } from 'react';
import axios from 'axios';

function WorkerLogin({ setWorker }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${backendURL}/api/workers/login`, formData);

      // ✅ Save token for session
      localStorage.setItem('workerToken', res.data.token);
      
      // ✅ Update parent state (Navbar trigger)
      setWorker(res.data.worker);

      alert(`Welcome, ${res.data.worker.name}!`);

    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: 'auto',
      marginTop: 60,
      padding: 25,
      border: '2px solid #4CAF50',
      borderRadius: 12,
      background: '#f3fff3',
    }}>
      <h4 className="text-center mb-4 fw-bold text-success">👷 Worker Login</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="form-control mb-3"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="form-control mb-4"
          required
        />
        <button className="btn btn-success w-100 fw-bold">
          <i className="bi bi-box-arrow-in-right me-2"></i> Login
        </button>
      </form>
    </div>
  );
}

export default WorkerLogin;
