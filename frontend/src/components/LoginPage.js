import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Sample logic — replace with real API call
    if (email === 'admin@carpenter.com' && pass === '123456') {
      localStorage.setItem('authToken', 'sample-session-token');
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('Login failed!');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <input className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
