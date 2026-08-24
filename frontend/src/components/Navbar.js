import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ worker, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const goToDashboard = () => {
    navigate('/worker-dashboard'); // Update this route as needed
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 px-lg-4 fixed-top site-navbar">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/images/logo.jpg"
          alt="Logo"
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            marginRight: 10,
            border: '2px solid #18dd39'
          }}
        />
        <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#ffc107' }}>Furniture kaamwallah.in</span>
      </Link>

      <button className="navbar-toggler" type="button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`navbar-collapse ${menuOpen ? 'menu-open' : ''}`} id="navMenu">
        <button className="drawer-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}><i className="bi bi-x-lg"></i></button>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              <i className="bi bi-house-door-fill me-1 text-success"></i>Home
            </Link>
          </li>
          <li className="nav-item desktop-nav-item">
            <Link className="nav-link" to="/about" onClick={closeMenu}>
              <i className="bi bi-info-circle-fill me-1 text-primary"></i>About Us
            </Link>
          </li>
          <li className="nav-item desktop-nav-item">
            <Link className="nav-link" to="/booking" onClick={closeMenu}>
              <i className="bi bi-calendar-check-fill me-1 text-warning"></i>Booking
            </Link>
          </li>
          <li className="nav-item desktop-nav-item">
            <Link className="nav-link" to="/contact" onClick={closeMenu}>
              <i className="bi bi-telephone-fill me-1 text-success"></i>Contact Us
            </Link>
          </li>
          <li className="nav-item desktop-nav-item">
            <Link className="nav-link" to="/admin/bookings" onClick={closeMenu}>
              <i className="bi bi-journal-text me-1 text-primary"></i>All Bookings
            </Link>
          </li>
        </ul>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={closeMenu}><i className="bi bi-house-door-fill"></i>Home</Link></li>
          <li><Link to="/#categories" onClick={closeMenu}><i className="bi bi-bag-heart-fill"></i>Shop Furniture</Link></li>
          <li><Link to="/#upvc-services" onClick={closeMenu}><i className="bi bi-grid-3x3-gap-fill"></i>UPVC Modern Kitchen</Link></li>
          <li><Link to="/#categories" onClick={closeMenu}><i className="bi bi-moon-stars-fill"></i>Luxury Bedroom</Link></li>
          <li><Link to="/#categories" onClick={closeMenu}><i className="bi bi-box-seam-fill"></i>Cupboards</Link></li>
          <li><Link to="/login" onClick={closeMenu}><i className="bi bi-person-circle"></i>Login / Sign In</Link></li>
        </ul>

        <div className="d-flex align-items-center">
          <a href="/#categories" className="btn btn-warning fw-bold shop-cta desktop-only-control me-2" onClick={closeMenu}>
            <i className="bi bi-bag-heart me-1"></i>Shop Furniture
          </a>
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
              <Link to="/login" className="btn btn-outline-light desktop-only-control me-2" onClick={closeMenu}>
                <i className="bi bi-person-circle me-1"></i>Login
              </Link>
              <Link to="/signup" className="btn btn-success desktop-only-control" onClick={closeMenu}>
                <i className="bi bi-person-plus-fill me-1"></i>Signup
              </Link>
            </>
          )}
        </div>
        <Link to="/booking" className="drawer-quote btn btn-warning" onClick={closeMenu}><i className="bi bi-lightning-charge-fill me-2"></i>Get Free Quote</Link>
      </div>
      {menuOpen && <button className="drawer-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu}></button>}
    </nav>
  );
}

export default Navbar;
