import React, { useState } from 'react';
import BookingForm from './BookingForm';

function HomePage() {
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column" style={{ border: '2px solid #0d6efd', borderRadius: '12px' }}>
      <div className="container py-5 flex-grow-1">
        {/* Hero Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 col-12 mb-4 mb-md-0">
            <h1 className="display-5 fw-bold text-primary mb-3">
              <i className="bi bi-house-door-fill" style={{ color: '#198754', fontSize: '2.2rem', verticalAlign: 'middle' }}></i>{' '}
              <span style={{ color: '#198754' }}>अब ऑनलाइन</span> <span style={{ color: '#0d6efd' }}>कारपेंटर</span> <span style={{ color: '#ffc107' }}>घर बुलाओ</span> <span style={{ color: '#212529' }}>इंडिया में!</span>
            </h1>
            <p className="lead text-dark mb-4" style={{ fontWeight: '500' }}>
Expert Carpentry & Interior Solutions  
From reliable repairs to custom furniture, we bring craftsmanship to your doorstep.

Carpenter Repairs — Quick fixes and restoration for wooden furniture and fittings.

Plywood & UPVC Cupboards — Durable, stylish cupboards built with precision.

Kitchen Interiors — Modular kitchens designed for functionality and elegance.

Bedroom Furniture — Wardrobes, beds, and storage solutions tailored to your space.

TV Cabinets — Modern entertainment units that blend style with utility.

Custom Work — Personalized carpentry solutions for unique requirements.

Professional craftsmanship, affordable pricing, and all‑India service — your trusted partner for every carpentry need. <br />
              फर्नीचर बनवाएँ, मरम्मत कराएँ या कस्टम वर्क के लिए अभी बुक करें।
            </p>
            <button
              className="btn"
              style={{
                background: 'linear-gradient(90deg, #198754 60%, #ffc107 100%)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(25,135,84,0.15)'
              }}
              onClick={() => setShowBookingModal(true)}
            >
              BOOK NOW(अभी बुक करें)
            </button>
          </div>
          <div className="col-md-6 col-12 text-center">
            <img
              src="/images/carpenter.jpg"
              alt="Carpenter"
              className="img-fluid rounded shadow border border-3 border-primary"
              style={{ maxHeight: '320px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="row mt-3">
          <h2 className="text-center mb-4 text-success">Our Services</h2>
          <div className="col-md-4 col-12 mb-4">
            <div className="card h-100 border-primary shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">Furniture Making</h5>
                <p className="card-text">Custom furniture design and assembly by expert carpenters.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-4">
            <div className="card h-100 border-success shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">Repairs & Restoration</h5>
                <p className="card-text">Quick fixes and restoration for all types of wooden items.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mb-4">
            <div className="card h-100 border-warning shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-warning">Custom Work</h5>
                <p className="card-text">Tailored carpentry solutions for your unique requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Book a Carpenter</h5>
                <button type="button" className="btn-close" onClick={() => setShowBookingModal(false)}></button>
              </div>
              <div className="modal-body">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-dark text-light py-3 mt-auto" style={{ borderTop: '2px solid #0d6efd' }}>
        <div className="container text-center">
          <small>
            &copy; {new Date().getFullYear()} Sohit Sharma | Owner: Sohit Sharma<br />
            Address: Patna, Baba Chowk, Bihar - 800001
          </small>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;