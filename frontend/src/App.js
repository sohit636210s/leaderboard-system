import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
import AdminBookingList from './components/AdminBookingList'; // 👈 NEW

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top" style={{ borderBottom: '2px solid #0d6efd', zIndex: 1050 }}>
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=60&q=80"
            alt="Logo"
            style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 10, border: '2px solid #ffc107' }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#ffc107' }}>Carpenter Portal</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <i className="bi bi-house-door-fill me-1" style={{ color: '#198754', fontSize: '1.2rem' }}></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/about">
                <i className="bi bi-info-circle-fill me-1" style={{ color: '#0d6efd', fontSize: '1.2rem' }}></i>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/booking">
                <i className="bi bi-calendar-check-fill me-1" style={{ color: '#ffc107', fontSize: '1.2rem' }}></i>
                Booking
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/contact">
                <i className="bi bi-telephone-fill me-1" style={{ color: '#198754', fontSize: '1.2rem' }}></i>
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/admin/bookings">
                <i className="bi bi-journal-text me-1" style={{ color: '#0d6efd', fontSize: '1.2rem' }}></i>
                All Bookings
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <>
                <span className="text-light me-3">👋 Welcome</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  <i className="bi bi-person-circle me-1"></i>Login
                </button>
                <Link to="/signup" className="btn btn-success">
                  <i className="bi bi-person-plus-fill me-1"></i>Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

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

      {/* Add padding so content is not hidden behind navbar */}
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/customers" element={<AdminCustomerList />} />
          <Route path="/admin/bookings" element={<AdminBookingList />} /> {/* 👈 NEW */}
          <Route path="/signup" element={<SignupSelector />} />
          <Route path="/worker-signup" element={<WorkerSignup />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route path="/worker-login" element={<WorkerLogin />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
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