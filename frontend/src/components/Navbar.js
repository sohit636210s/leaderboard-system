import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ worker, handleLogout }) {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/worker-dashboard'); // Update this route as needed
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 fixed-top" style={{ borderBottom: '2px solid #0d6efd', zIndex: 1050 }}>
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/images/logo.avif"
          alt="Logo"
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            marginRight: 10,
            border: '2px solid #ffc107'
          }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#ffc107' }}>Furniture kaamwallah.in</span>
      </Link>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <i className="bi bi-house-door-fill me-1 text-success"></i>Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              <i className="bi bi-info-circle-fill me-1 text-primary"></i>About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/booking">
              <i className="bi bi-calendar-check-fill me-1 text-warning"></i>Booking
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">
              <i className="bi bi-telephone-fill me-1 text-success"></i>Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/bookings">
              <i className="bi bi-journal-text me-1 text-primary"></i>All Bookings
            </Link>
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {worker ? (
            <>
              <div className="d-flex align-items-center me-3" style={{ cursor: 'pointer' }} onClick={goToDashboard}>
                <img
                  src={worker.profilePic || 'https://i.imgur.com/0y0y0y0.png'} // Fallback image
                  alt="Profile"
                  className="rounded-circle border border-success"
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: 'cover',
                    marginRight: 8
                  }}
                />
                <span className="text-light fw-bold">{worker.name}</span>
              </div>
              <button className="btn btn-outline-light" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light me-2">
                <i className="bi bi-person-circle me-1"></i>Login
              </Link>
              <Link to="/signup" className="btn btn-success">
                <i className="bi bi-person-plus-fill me-1"></i>Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
