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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ UPDATED: Using Render backend URL
      const res = await axios.post(
        'https://leaderboard-system-vsj9.onrender.com/api/bookings/book',
        formData
      );
      setMatchedWorker(res.data.matchedWorker);
    } catch (err) {
      console.error('Booking failed:', err.message);
      alert('Booking request failed. Check console for details.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div
        className="card shadow-lg p-4 w-100"
        style={{
          maxWidth: 480,
          borderRadius: '18px',
          border: '3px solid',
          borderImage: 'linear-gradient(90deg, #198754 60%, #ffc107 100%) 1',
          background: 'linear-gradient(120deg, #f8f9fa 80%, #e9ecef 100%)'
        }}
      >
        <div className="text-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=80&q=80"
            alt="Carpenter Booking"
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px solid #198754',
              boxShadow: '0 2px 8px rgba(25,135,84,0.15)',
              objectFit: 'cover',
            }}
          />
        </div>
        <h3 className="text-center mb-3 fw-bold" style={{ color: '#198754' }}>
          <i className="bi bi-calendar-check-fill me-2" style={{ color: '#ffc107', fontSize: '1.5rem', verticalAlign: 'middle' }}></i>
          Book a Carpenter
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Input Fields */}
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label fw-semibold">
              <i className="bi bi-person-fill me-1" style={{ color: '#198754' }}></i> Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label fw-semibold">
              <i className="bi bi-geo-alt-fill me-1" style={{ color: '#dc3545' }}></i> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label fw-semibold">
              <i className="bi bi-building me-1" style={{ color: '#0d6efd' }}></i> City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="pincode" className="form-label fw-semibold">
              <i className="bi bi-pin-map-fill me-1" style={{ color: '#ffc107' }}></i> Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your pincode"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contact" className="form-label fw-semibold">
              <i className="bi bi-telephone-fill me-1" style={{ color: '#198754' }}></i> Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your contact number"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobDescription" className="form-label fw-semibold">
              <i className="bi bi-tools me-1" style={{ color: '#dc3545' }}></i> Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="form-control"
              placeholder="Describe your carpentry job"
              rows={3}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            className="btn w-100 fw-bold"
            style={{
              background: 'linear-gradient(90deg, #198754 60%, #ffc107 100%)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '1.1rem',
              border: 'none',
              boxShadow: '0 2px 8px rgba(25,135,84,0.15)'
            }}
          >
            <i className="bi bi-send-check me-2"></i>
            Submit Booking
          </button>
        </form>

        {/* Booking Match Result */}
        {matchedWorker && (
          <div className="mt-4 alert alert-success">
            <h5>
              <i className="bi bi-person-check-fill me-2" style={{ color: '#198754' }}></i>
              Nearest Worker Found:
            </h5>
            <p><strong>Name:</strong> {matchedWorker.name}</p>
            <p><strong>City:</strong> {matchedWorker.city}</p>
            <p><strong>Pincode:</strong> {matchedWorker.pincode}</p>
            <p><strong>Contact:</strong> {matchedWorker.contact}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
