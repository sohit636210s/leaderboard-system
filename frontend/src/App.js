import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
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
import WorkerDashboard from './components/WorkerDashboard'; // ✅ Added new component
import ShoppingPage from './features/shopping/ShoppingPage';
import AdminPage from './features/admin/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [worker, setWorker] = useState(null); // ✅ To customize Navbar + pass to dashboard
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      // 👇 Optional: restore worker info if needed from localStorage or API
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('workerToken'); // ✅ Clear worker token too
    setIsLoggedIn(false);
    setWorker(null); // ✅ Reset on logout
    navigate('/login');
  };

  return (
    <>
      {!isAdminPage && <Navbar
        worker={worker}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        setShowLoginModal={setShowLoginModal}
      />}

      {/* Login Modal */}
      {!isAdminPage && showLoginModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Welcome Back!</h5>
                <button type="button" className="btn-close" onClick={() => setShowLoginModal(false)}></button>
              </div>
              <div className="modal-body">
                <WorkerLogin setWorker={setWorker} setIsLoggedIn={setIsLoggedIn} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="app-content-offset">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin/customers" element={<AdminCustomerList />} />
          <Route path="/admin/bookings" element={<AdminBookingList />} />
          <Route path="/signup" element={<SignupSelector />} />
          <Route path="/worker-signup" element={<WorkerSignup />} />
          <Route path="/customer-signup" element={<CustomerSignup />} />
          <Route
            path="/worker-login"
            element={<WorkerLogin setWorker={setWorker} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/customer-login" element={<CustomerLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<WorkerLogin setWorker={setWorker} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/worker-dashboard" element={<WorkerDashboard worker={worker} />} /> {/* ✅ Added route */}
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
