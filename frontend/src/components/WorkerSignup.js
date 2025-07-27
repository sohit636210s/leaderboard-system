import React, { useState } from 'react';
import axios from 'axios';

function WorkerSignup() {
  const [formData, setFormData] = useState({
    name: '', skill: '', city: '', pincode: '', contact: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/workers/register', formData);
      alert('Worker registered successfully!');
    } catch (err) {
      alert('Error during registration');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', marginTop: '50px', border: '2px solid #e91e63', padding: 25, borderRadius: 12 }}>
      <h3 className="text-center mb-4">👷 काम करने वाला (Worker) रजिस्ट्रेशन</h3>
      <form onSubmit={handleSubmit}>
        {['name', 'skill', 'city', 'pincode', 'contact'].map(field => (
          <input
            key={field} name={field} value={formData[field]}
            onChange={handleChange}
            placeholder={field.toUpperCase()}
            className="form-control mb-3"
            style={{ border: '1.5px solid #e91e63' }} required
          />
        ))}
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default WorkerSignup;
