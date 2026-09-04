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
      <Link className="navbar-brand site-brand d-flex align-items-center" to="/" onClick={closeMenu}>
        <img
          src="/images/logo.jpg"
          alt="Logo"
        />
        <span>Furniture kaamwallah.in</span>
      </Link>

      <button className="navbar-toggler mobile-menu-toggle" type="button" aria-label="Open navigation menu" aria-controls="navMenu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`nav-shell ${menuOpen ? 'menu-open' : ''}`} id="navMenu">
        <button className="drawer-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}><i className="bi bi-x-lg"></i></button>
        <ul className="navbar-nav desktop-nav-list">
          <li className="nav-item">
            <Link className="nav-link" to="/" onClick={closeMenu}>
              <i className="bi bi-house-door-fill me-1 text-success"></i>Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about" onClick={closeMenu}>
              <i className="bi bi-info-circle-fill me-1 text-primary"></i>About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact" onClick={closeMenu}>
              <i className="bi bi-telephone-fill me-1 text-success"></i>Contact Us
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/shopping" onClick={closeMenu}>
              <i className="bi bi-shop me-1 text-warning"></i>Shopping
            </Link>
          </li>
        </ul>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={closeMenu}><i className="bi bi-house-door-fill"></i>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}><i className="bi bi-info-circle-fill"></i>About Us</Link></li>
          <li><Link to="/contact" onClick={closeMenu}><i className="bi bi-telephone-fill"></i>Contact Us</Link></li>
          <li><Link to="/shopping" onClick={closeMenu}><i className="bi bi-bag-heart-fill"></i>Furniture Shopping</Link></li>
          <li><Link to="/login" onClick={closeMenu}><i className="bi bi-person-circle"></i>Login / Sign In</Link></li>
          <li><Link to="/signup" onClick={closeMenu}><i className="bi bi-person-plus-fill"></i>Signup</Link></li>
        </ul>

        <div className="d-flex align-items-center navbar-actions">
          <Link to="/shopping" className="btn btn-outline-warning desktop-action me-2" onClick={closeMenu}>
            <i className="bi bi-shop me-1"></i>Shopping
          </Link>
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
              <Link to="/login" className="btn btn-outline-light desktop-action me-2" onClick={closeMenu}>
                <i className="bi bi-person-circle me-1"></i>Login
              </Link>
              <Link to="/signup" className="btn btn-success desktop-action" onClick={closeMenu}>
                <i className="bi bi-person-plus-fill me-1"></i>Signup
              </Link>
            </>
          )}
        </div>
      </div>
      {menuOpen && <button className="drawer-backdrop" type="button" aria-label="Close navigation menu" onClick={closeMenu}></button>}
    </nav>
  );
}

export default Navbar;
