import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

function WorkerDashboard({ worker }) {
  const [currentWorker, setCurrentWorker] = useState(worker);
  const [photoMessage, setPhotoMessage] = useState('');

  const handlePhotoUpload = async (event) => {
    const photo = event.target.files[0];
    if (!photo || !currentWorker?._id) return;
    const payload = new FormData();
    payload.append('photo', photo);
    try {
      const response = await axios.put(`${API_BASE_URL}/api/workers/photo/${currentWorker._id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('workerToken')}` }
      });
      setCurrentWorker(response.data.worker);
      setPhotoMessage('Profile photo uploaded successfully.');
    } catch (error) {
      setPhotoMessage(error.response?.data?.error || 'Photo upload failed.');
    }
  };

  if (!worker) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">Access Denied ❌</h4>
        <p>Please login to view dashboard.</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 500,
      margin: 'auto',
      marginTop: 60,
      padding: 20,
      borderRadius: 12,
      background: '#ffffff',
      boxShadow: '0 0 8px rgba(0,0,0,0.15)',
    }}>
      <div className="text-center mb-4">
        <img
          src={currentWorker.photo && currentWorker.photo !== 'default.jpg' ? `${API_BASE_URL}/uploads/workers/${currentWorker.photo}` : 'https://via.placeholder.com/100'}
          alt="Worker DP"
          className="rounded-circle mb-3"
          style={{
            width: 100,
            height: 100,
            border: '3px solid #28a745',
            objectFit: 'cover',
          }}
        />
        <h5 className="fw-bold text-success mb-1">{currentWorker.name}</h5>
        <span className="text-muted">{currentWorker.skill || 'Carpenter'}</span>
        <label className="btn btn-outline-success btn-sm d-block mt-2">
          <i className="bi bi-camera me-1"></i> Upload profile photo
          <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
        </label>
        {photoMessage && <small className="d-block mt-2 text-success">{photoMessage}</small>}
      </div>

      <div className="mb-3">
        <strong>Email:</strong>
        <div>{currentWorker.email}</div>
      </div>

      <div className="mb-3">
        <strong>Mobile:</strong>
        <div>{currentWorker.contact || 'Not Provided'}</div>
      </div>

      <div className="mb-3">
        <strong>Availability:</strong>
        <div className={currentWorker.isAvailable ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
          {currentWorker.isAvailable ? '✅ Available' : '❌ Not Available'}
        </div>
      </div>

      <button
        className="btn btn-outline-primary w-100"
        onClick={() => alert('Edit feature coming soon')}
      >
        ✏️ Edit Profile
      </button>
    </div>
  );
}

export default WorkerDashboard;
