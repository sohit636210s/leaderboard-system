import React, { useState } from 'react';
import axios from 'axios';

function WorkerLogin() {
  const [formData, setFormData] = useState({ contact: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/workers/list`);
      const match = res.data.find(w => w.contact === formData.contact);
      if (match) {
        alert(`Welcome worker: ${match.name}`);
      } else {
        alert('Worker not found!');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 60, border: '2px solid #e91e63', padding: 25, borderRadius: 12 }}>
      <h4 className="text-center mb-3">👷 Worker Login</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="contact" value={formData.contact}
          onChange={e => setFormData({ contact: e.target.value })}
          placeholder="CONTACT NUMBER"
          className="form-control mb-3"
          style={{ border: '1.5px solid #e91e63' }} required
        />
        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default WorkerLogin;
