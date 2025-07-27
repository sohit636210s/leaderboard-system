import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminCustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/customers/list');
        setCustomers(res.data);
      } catch (err) {
        console.error('Error fetching customers:', err.message);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">📋 Registered Customers</h3>
      <table className="table table-bordered text-center">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>नाम (Name)</th>
            <th>शहर (City)</th>
            <th>पिनकोड (Pincode)</th>
            <th>संपर्क (Contact)</th>
            <th>रजिस्ट्रेशन डेट</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust, index) => (
            <tr key={cust._id}>
              <td>{index + 1}</td>
              <td>{cust.name}</td>
              <td>{cust.city}</td>
              <td>{cust.pincode}</td>
              <td>{cust.contact}</td>
              <td>{new Date(cust.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="6" className="text-muted">कोई ग्राहक अभी पंजीकृत नहीं है</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCustomerList;
