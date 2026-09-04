import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';

function WorkerLogin({ setWorker }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg(''); // Clear error on typing
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/workers/login`, formData);
      
      localStorage.setItem('workerToken', res.data.token);
      setWorker(res.data.worker);
      setErrorMsg('');
      navigate('/'); // ✅ Redirect to HomePage

    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed!';
      setErrorMsg(msg); // ❌ Show error above form
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
      <h4 className="text-center mb-3 fw-bold text-success">👷 Worker Login</h4>

      {/* 🔴 Error message box */}
      {errorMsg && (
        <div className="alert alert-danger py-2 fw-semibold text-center" role="alert">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="mb-1 fw-medium">Email Address:</label>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="form-control mb-3"
          required
        />

        <label className="mb-1 fw-medium">Password:</label>
        <div className="input-group mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="form-control"
            required
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(prev => !prev)}
            title="Show/Hide Password"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 fw-bold"
          style={{ transition: '0.3s' }}
          onMouseEnter={e => e.target.style.background = '#45a049'}
          onMouseLeave={e => e.target.style.background = '#4CAF50'}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i> Login
        </button>
      </form>
    </div>
  );
}

export default WorkerLogin;
