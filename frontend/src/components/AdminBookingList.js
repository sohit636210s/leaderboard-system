import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminBookingList() {
  const [bookings, setBookings] = useState([]);

  const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/bookings/list`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err.message);
      }
    };
    fetchBookings();
  }, [backendURL]);

  return (
    <div className="container mt-4 px-2">
      {/* 🔴 Booking Heading Brand Color (Change this if needed) */}
      <h3 className="mb-4 text-center fw-bold" style={{ color: '#dc3545' }}>
        📋 All Customer Bookings
      </h3>

      {/* 📱 Responsive Table with Bootstrap scroll */}
      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-hover text-center align-middle" style={{ fontSize: '0.95rem' }}>
          <thead className="table-danger"> {/* 🔴 Table Header Color */}
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>Job Description</th>
              <th>Matched Worker</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b, idx) => (
                <tr key={b._id}>
                  <td>{idx + 1}</td>
                  <td className="fw-semibold">{b.customerName}</td>
                  <td>{b.contact}</td>
                  <td style={{ whiteSpace: 'pre-wrap' }}>{b.address}</td>
                  <td>{b.pincode}</td>
                  <td style={{ whiteSpace: 'pre-wrap', maxWidth: 200 }}>{b.jobDescription}</td>
                  <td>
                    {b.matchedWorker ? (
                      <div className="text-success">
                        <strong>{b.matchedWorker.name}</strong><br />
                        <small>{b.matchedWorker.contact}</small>
                      </div>
                    ) : (
                      <span className="text-danger fw-semibold">No worker</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted py-3">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBookingList;
