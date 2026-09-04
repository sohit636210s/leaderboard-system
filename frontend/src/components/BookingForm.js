import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

function BookingForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    address: '',
    pincode: '',
    jobDescription: ''
  });

  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/api/bookings/book`, formData);
      setAvailableWorkers(res.data.availableWorkers || (res.data.matchedWorker ? [res.data.matchedWorker] : []));
      setSubmissionMessage(
        res.data.availableWorkers?.length || res.data.matchedWorker
          ? 'Booking submitted. Available carpenters near your pincode are shown below.'
          : 'Booking submitted, but no available carpenter was found near your pincode.'
      );
    } catch (err) {
      console.error('Booking failed:', err.message);
      setSubmissionMessage('❌ Booking failed. Please try again later.');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg p-4 w-100" style={{
        maxWidth: 480,
        borderRadius: '18px',
        border: '3px solid #dc3545',
        background: 'linear-gradient(120deg, #f8f9fa 80%, #ffeaea 100%)'
      }}>
        <div className="text-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=80&q=80"
            alt="Carpenter"
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '2px solid #dc3545',
              boxShadow: '0 2px 8px rgba(220,53,69,0.2)',
              objectFit: 'cover',
            }}
          />
        </div>
        <h3 className="text-center mb-3 fw-bold" style={{ color: '#dc3545' }}>
          <i className="bi bi-hammer me-2" style={{ fontSize: '1.5rem' }}></i>
          Book Furniture Work
        </h3>
        <form onSubmit={handleSubmit}>
          {/* 👤 Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-person-fill me-1" style={{ color: '#dc3545' }}></i> Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="form-control"
              style={{
                border: '2px solid #dc3545',
                boxShadow: '0 0 5px rgba(220,53,69,0.3)'
              }}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* 📱 Contact */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-phone-fill me-1" style={{ color: '#dc3545' }}></i> Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control"
              style={{
                border: '2px solid #dc3545',
                boxShadow: '0 0 5px rgba(220,53,69,0.3)'
              }}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* 🏠 Address */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-geo-alt-fill me-1" style={{ color: '#dc3545' }}></i> Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              style={{
                border: '2px solid #dc3545',
                boxShadow: '0 0 5px rgba(220,53,69,0.3)'
              }}
              placeholder="Enter your address"
              required
            />
          </div>

          {/* 📮 Pincode */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-pin-map-fill me-1" style={{ color: '#dc3545' }}></i> Pincode
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="form-control"
              style={{
                border: '2px solid #dc3545',
                boxShadow: '0 0 5px rgba(220,53,69,0.3)'
              }}
              placeholder="Enter your area pincode"
              required
            />
          </div>

          {/* 🔨 Job Description */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <i className="bi bi-tools me-1" style={{ color: '#dc3545' }}></i> Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="form-control"
              style={{
                border: '2px solid #dc3545',
                boxShadow: '0 0 5px rgba(220,53,69,0.3)'
              }}
              placeholder="Wardrobe, kitchen, bedroom, hall, furniture or UPVC cupboard work"
              rows={3}
              required
            />
          </div>

          <button className="btn w-100 fw-bold" style={{
            background: '#dc3545',
            color: '#fff',
            borderRadius: '8px',
            fontSize: '1.1rem',
            border: 'none',
            boxShadow: '0 2px 8px rgba(220,53,69,0.2)'
          }}>
            <i className="bi bi-send-check me-2"></i> Submit Booking
          </button>
        </form>              

        {submissionMessage && (
          <div className="mt-4 alert alert-success text-center">
            {submissionMessage}
          </div>
        )}

        {availableWorkers.length > 0 && (
          <div className="mt-2 alert alert-success">
            <h5><i className="bi bi-person-check-fill me-2"></i>Available carpenters near you</h5>
            {availableWorkers.map((worker) => (
              <div key={worker._id || worker.contact} className="border-top pt-2 mt-2">
                <p className="mb-1"><strong>{worker.name}</strong> {worker.verified ? <span className="badge text-bg-success ms-2">Verified</span> : null}</p>
                <p className="mb-1">{worker.city || 'Nearby'} · Pincode {worker.pincode}</p>
                <a href={`tel:${worker.contact}`} className="fw-bold text-success">Call {worker.contact}</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingForm;
