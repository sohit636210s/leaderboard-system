import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../api';

function WorkerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    address: '',
    pincode: '',
    skill: ''
  });
  const [registeredWorker, setRegisteredWorker] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/workers/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        address: formData.address,
        pincode: formData.pincode,
        skill: formData.skill
      });
      setRegisteredWorker(res.data.worker || formData);
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Registration failed. Please try again.';
      setErrorMsg(errorMsg);
      console.error('Registration error:', err);
    }
  };

  if (registeredWorker) {
    return (
      <div className="worker-signup-success" role="status">
        <div className="success-icon"><i className="bi bi-check-lg"></i></div>
        <h2>Signup successful!</h2>
        <p className="success-lead">Your Furniture Kaam Wallah worker account has been created.</p>
        <div className="registered-profile">
          <p><strong>Name</strong><span>{registeredWorker.name}</span></p>
          <p><strong>Phone</strong><span>{registeredWorker.contact}</span></p>
          <p><strong>Email</strong><span>{registeredWorker.email}</span></p>
        </div>
        <p className="success-note">You can log in now. After login, you will have the option to upload your profile photo.</p>
        <Link to="/worker-login" className="btn btn-success w-100 fw-bold">Continue to Worker Login</Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 520, margin: 'auto', marginTop: '50px',
      border: '2px solid #e91e63', padding: 25, borderRadius: 12,
      background: '#fdf4f9'
    }}>
      <h3 className="text-center mb-4 text-danger fw-bold">
        👷 काम करने वाला रजिस्ट्रेशन (Worker Signup)
      </h3>
      <form onSubmit={handleSubmit}>
        {[
          { name: 'name', placeholder: 'Full Name' },
          { name: 'email', placeholder: 'Email Address', type: 'email' },
          { name: 'password', placeholder: 'Password', type: 'password' },
          { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
          { name: 'contact', placeholder: 'Mobile Number' },
          { name: 'address', placeholder: 'Full Address' },
          { name: 'pincode', placeholder: 'Area Pincode' }
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="form-control mb-3"
            style={{ border: '1.5px solid #e91e63' }}
            required
          />
        ))}

        {/* 🔧 Skill Dropdown Fix */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Skill:</label>
          <select
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            className="form-control"
            style={{ border: '1.5px solid #e91e63' }}
            required
          >
            <option value="">-- Select Skill --</option>
            {['Carpenter', 'Electrician', 'Plumber', 'Painter', 'Other'].map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>

        <p className="text-muted small mb-3">You can upload your profile photo after logging in.</p>

        <button className="btn btn-danger w-100 fw-bold">
          <i className="bi bi-person-plus me-2"></i> Register
        </button>
      </form>
      {errorMsg && <div className="alert alert-danger mt-3 mb-0" role="alert">{errorMsg}</div>}
    </div>
  );
}

export default WorkerSignup;
