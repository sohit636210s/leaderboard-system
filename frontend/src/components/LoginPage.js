import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg(''); // Clear previous error
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/worker/login`, {
        email,
        password: pass,
      });

      const { token, worker, message } = res?.data || {};

      if (token) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('workerInfo', JSON.stringify(worker));
        setIsLoggedIn && setIsLoggedIn(true);
        navigate('/');
      } else {
        setErrorMsg(message || 'Login failed!');
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || 'Invalid credentials!');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: 400,
          width: '100%',
          borderRadius: '18px',
          border: '3px solid',
          borderImage: 'linear-gradient(90deg, #198754 60%, #dc3545 100%) 1',
        }}
      >
        {/* Error Message */}
        {errorMsg && (
          <div className="text-danger fw-semibold mb-3 text-center" style={{ fontSize: '0.95rem' }}>
            {errorMsg}
          </div>
        )}

        {/* Logo */}
        <div className="text-center mb-3">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
            alt="Worker Logo"
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px solid #198754',
              boxShadow: '0 2px 8px rgba(220,53,69,0.15)',
              objectFit: 'cover',
            }}
          />
        </div>

        <h4 className="text-center mb-4 fw-bold" style={{ color: '#198754' }}>
          <i className="bi bi-person-badge" style={{ color: '#dc3545', fontSize: '1.5rem', verticalAlign: 'middle' }}></i>{' '}
          Login for Worker
        </h4>

        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="email">
            Email Address
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-envelope-fill" style={{ color: '#198754' }}></i>
            </span>
            <input
              id="email"
              className="form-control"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold" htmlFor="password">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text bg-light">
              <i className="bi bi-lock-fill" style={{ color: '#dc3545' }}></i>
            </span>
            <input
              id="password"
              className="form-control"
              type="password"
              placeholder="Enter your password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
        </div>

        <button
          className="btn w-100 fw-bold"
          style={{
            background: 'linear-gradient(90deg, #198754 60%, #dc3545 100%)',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(25,135,84,0.15)',
            border: 'none',
            fontSize: '1.1rem',
          }}
          onClick={handleLogin}
        >
          <i className="bi bi-box-arrow-in-right me-2"></i>Login
        </button>

        <div className="text-center mt-3">
          <span className="text-muted">Not registered?</span>{' '}
          <button
            className="btn btn-link text-decoration-none fw-bold"
            style={{ color: '#dc3545' }}
            onClick={() => navigate('/worker-signup')}
          >
            Register as Worker
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
