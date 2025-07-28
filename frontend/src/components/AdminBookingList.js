import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminBookingList() {
  const [bookings, setBookings] = useState([]);

  // ✅ Backend URL from Netlify Environment Variable
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
    <div className="container mt-5">
      <h3 className="mb-4 text-center">📝 All Customer Bookings</h3>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Customer Name</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Contact</th>
            <th>Job Description</th>
            <th>Matched Worker</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b, idx) => (
              <tr key={b._id}>
                <td>{idx + 1}</td>
                <td>{b.customerName}</td>
                <td>{b.city}</td>
                <td>{b.pincode}</td>
                <td>{b.contact}</td>
                <td>{b.jobDescription}</td>
                <td>
                  {b.matchedWorker
                    ? `${b.matchedWorker.name} (${b.matchedWorker.contact})`
                    : <span className="text-danger">No worker</span>
                  }
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-muted">No bookings found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookingList;
