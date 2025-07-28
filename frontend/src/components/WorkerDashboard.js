import React from 'react';

function WorkerDashboard({ worker }) {
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
          src={worker.profilePhoto || 'https://via.placeholder.com/100'}
          alt="Worker DP"
          className="rounded-circle mb-3"
          style={{
            width: 100,
            height: 100,
            border: '3px solid #28a745',
            objectFit: 'cover',
          }}
        />
        <h5 className="fw-bold text-success mb-1">{worker.name}</h5>
        <span className="text-muted">{worker.workType || 'Work type not set'}</span>
      </div>

      <div className="mb-3">
        <strong>Email:</strong>
        <div>{worker.email}</div>
      </div>

      <div className="mb-3">
        <strong>Mobile:</strong>
        <div>{worker.mobile || 'Not Provided'}</div>
      </div>

      <div className="mb-3">
        <strong>Availability:</strong>
        <div className={worker.available ? 'text-success fw-semibold' : 'text-danger fw-semibold'}>
          {worker.available ? '✅ Available' : '❌ Not Available'}
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
