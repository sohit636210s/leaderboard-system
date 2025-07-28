import React, { useState } from 'react';
import axios from 'axios';

function WorkerSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    address: '',
    pincode: '',
    skill: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData(prev => ({ ...prev, photo: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('🚫 Passwords do not match');
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      const backendURL = process.env.REACT_APP_BACKEND_URL;
      const res = await axios.post(`${backendURL}/api/workers/register`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert(`✅ ${res.data.message}`);
      // redirect logic here if needed
    } catch (err) {
      const errorMsg = err.response?.data?.details || err.response?.data?.error || 'Registration failed';
      alert(`❌ ${errorMsg}`);
      console.error('Registration error:', err);
    }
  };

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

        {/* 🖼️ Photo Upload */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Upload Profile Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="form-control"
            style={{ border: '1.5px solid #e91e63' }}
            required
          />
        </div>

        <button className="btn btn-danger w-100 fw-bold">
          <i className="bi bi-person-plus me-2"></i> Register
        </button>
      </form>
    </div>
  );
}

export default WorkerSignup;
