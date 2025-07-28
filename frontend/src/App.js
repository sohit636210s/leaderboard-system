// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import BookingForm from './components/BookingForm';
import WorkerSignup from './components/WorkerSignup';
import CustomerSignup from './components/CustomerSignup';
import WorkerLogin from './components/WorkerLogin';
import CustomerLogin from './components/CustomerLogin';
import SignupSelector from './components/SignupSelector';
import AdminCustomerList from './components/AdminCustomerList';
import AdminBookingList from './components/AdminBookingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [worker, setWorker] = useState(null); // 👈 to customize Navbar if needed
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setWorker(null); // optional cleanup
    navigate('/login');
  };

  return (
    <>
      {/* Modular Navbar Component */}
      <Navbar worker={worker} handleLogout={handleLogout} isLoggedIn={isLoggedIn} setShowLoginModal={setShowLoginModal} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Welcome Back!</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
              </div>
              <div className="modal-body">
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/customers" element={<AdminCustomerList />} />
          <Route path="/admin/bookings" element={<AdminBookingList />} />
          <Route path="/signup" element={<SignupSelector />} />
          <Route path="/worker-signup" element={<WorkerSignup />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/worker-login" element={<WorkerLogin setWorker={setWorker} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/customer-login" element={<CustomerLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
