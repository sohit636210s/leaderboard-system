import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'; // (Optional: for common login fallback)
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import BookingForm from './components/BookingForm';

import WorkerSignup from './components/WorkerSignup';
import CustomerSignup from './components/CustomerSignup';
import WorkerLogin from './components/WorkerLogin';
import CustomerLogin from './components/CustomerLogin';
import SignupSelector from './components/SignupSelector';
import AdminCustomerList from './components/AdminCustomerList';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand" to="/">Carpenter Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/booking">Booking</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
          </ul>
          <div className="d-flex">
            {isLoggedIn ? (
              <>
                <span className="text-light me-3">👋 Welcome</span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/worker-login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/signup" className="btn btn-success">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin/customers" element={<AdminCustomerList />} />

        {/* 🧑‍💼 Role-based Signup/Login */}
        <Route path="/signup" element={<SignupSelector />} />
        <Route path="/worker-signup" element={<WorkerSignup />} />
        <Route path="/customer-signup" element={<CustomerSignup />} />
        <Route path="/worker-login" element={<WorkerLogin />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        {/* Optional fallback */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
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
