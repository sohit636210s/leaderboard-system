import React, { useState } from 'react';
import axios from 'axios';

function CustomerLogin() {
  const [formData, setFormData] = useState({ contact: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/customers/list`);
      const match = res.data.find(c => c.contact === formData.contact);
      if (match) {
        alert(`Welcome customer: ${match.name}`);
      } else {
        alert('Customer not found!');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', marginTop: 60, border: '2px solid #e91e63', padding: 25, borderRadius: 12 }}>
      <h4 className="text-center mb-3">🧑‍💼 Customer Login</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text" name="contact" value={formData.contact}
          onChange={e => setFormData({ contact: e.target.value })}
          placeholder="CONTACT NUMBER"
          className="form-control mb-3"
          style={{ border: '1.5px solid #e91e63' }} required
        />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}

export default CustomerLogin;
