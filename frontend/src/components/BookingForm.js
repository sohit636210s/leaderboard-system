import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    city: '',
    pincode: '',
    contact: '',
    jobDescription: ''
  });

  const [matchedWorker, setMatchedWorker] = useState(null);

  // 🔄 Input field update handler
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 🚀 Submit booking to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/bookings/book', formData);
      setMatchedWorker(res.data.matchedWorker); // 🔍 matched worker mil gaya
    } catch (err) {
      console.error('Booking failed:', err.message);
      alert('Booking request failed. Check console for details.');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Book a Carpenter</h2>
      <form onSubmit={handleSubmit}>
        {['customerName', 'address', 'city', 'pincode', 'contact', 'jobDescription'].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            className="form-control mb-2"
            required
          />
        ))}
        <button className="btn btn-success">Submit Booking</button>
      </form>

      {matchedWorker && (
        <div className="mt-4 alert alert-info">
          <h5>📍 Nearest Worker Found:</h5>
          <p><strong>Name:</strong> {matchedWorker.name}</p>
          <p><strong>City:</strong> {matchedWorker.city}</p>
          <p><strong>Pincode:</strong> {matchedWorker.pincode}</p>
          <p><strong>Contact:</strong> {matchedWorker.contact}</p>
        </div>
      )}
    </div>
  );
}

export default BookingForm;
