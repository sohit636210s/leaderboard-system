import React, { useState } from 'react';
import BookingForm from './BookingForm';

function HomePage() {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Modular Kitchen');

  const categories = [
    { name: 'Modular Kitchen', icon: 'bi-grid-3x3-gap-fill', image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=800&auto=format&fit=crop' },
    { name: 'Luxury Sofa', icon: 'bi-house-heart-fill', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop' },
    { name: 'King Size Bed', icon: 'bi-moon-stars-fill', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop' },
    { name: 'Wardrobe', icon: 'bi-box-seam-fill', image: '/images/upvc-wardrobe.jpg' }
  ];

  const openEstimate = (category = selectedCategory) => {
    setSelectedCategory(category);
    setShowBookingModal(true);
  };

  return (
    <div className="home-page min-vh-100 d-flex flex-column">
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container py-5">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <p className="eyebrow mb-3"><i className="bi bi-stars me-2"></i>CRAFTED FOR THE WAY YOU LIVE</p>
                <h1 className="display-4 fw-bold mb-4">Furniture Kaam Wallah <span>redefines your space.</span></h1>
                <p className="hero-copy mb-4">Discover Best Custom Furniture, Premium Luxury Sofa &amp; Beds, and Expert Carpenter Services designed around your home. From an Affordable Modular Kitchen to a single beautiful repair, our craftsmen bring your vision to life.</p>
                <div className="d-flex flex-wrap gap-3">
                  <button className="btn btn-primary btn-lg px-4" onClick={() => openEstimate()}><i className="bi bi-calendar2-check me-2"></i>Get a Free Estimate</button>
                  <a className="btn btn-outline-dark btn-lg px-4" href="#categories">Explore the collection <i className="bi bi-arrow-down-right ms-2"></i></a>
                </div>
                <div className="hero-proof mt-5"><strong>4.9/5</strong><span className="stars">★★★★★</span><span>Trusted craftsmanship for homes across India</span></div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image-wrap">
                  <img src="/images/carpenter.jpg" alt="Expert carpenter crafting custom furniture" className="hero-image" />
                  <div className="hero-badge"><i className="bi bi-patch-check-fill"></i><span>Made with care<br /><strong>Built to last</strong></span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="planner-section py-5" aria-labelledby="planner-heading">
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-lg-5"><p className="eyebrow">YOUR SPACE, YOUR WAY</p><h2 id="planner-heading">Start with a room in mind.</h2><p className="text-muted">Choose a category and our team will turn your first idea into a clear, no-pressure quotation.</p></div>
              <div className="col-lg-7"><div className="planner-panel"><div className="row g-2">{categories.map((category) => <div className="col-6 col-md-3" key={category.name}><button className={`planner-option ${selectedCategory === category.name ? 'active' : ''}`} onClick={() => setSelectedCategory(category.name)}><i className={`bi ${category.icon}`}></i><span>{category.name}</span></button></div>)}</div><div className="planner-result mt-4"><div><small>YOUR STARTING POINT</small><h3>{selectedCategory}</h3></div><button className="btn btn-dark" onClick={() => openEstimate()}><i className="bi bi-chat-quote me-2"></i>Get Free Estimate</button></div></div></div>
            </div>
          </div>
        </section>

        <section id="upvc-services" className="upvc-section py-5" aria-labelledby="upvc-heading">
          <div className="container">
            <div className="row align-items-end g-3 mb-4">
              <div className="col-lg-8"><p className="eyebrow">BUILT FOR INDIAN HOMES</p><h2 id="upvc-heading">Expert Wooden &amp; UPVC Home Interiors</h2><p className="section-copy">As your No. 1 Premium Carpenter in India, Furniture Kaam Wallah creates durable interiors with thoughtful design, precise installation, and honest pricing.</p></div>
              <div className="col-lg-4 text-lg-end"><p className="seo-note">Your Best UPVC Modular Kitchen Designer for modern, low-maintenance spaces.</p></div>
            </div>
            <div className="row g-4">
              <div className="col-12 col-md-4"><article className="upvc-card"><div className="upvc-icon"><i className="bi bi-columns-gap"></i></div><h3>Modern UPVC Cupboards &amp; Wardrobes</h3><p>Top Custom UPVC Cupboards and Wardrobes with a clean finish, 100% water-proof panels, and termite-proof storage.</p><button className="btn btn-outline-dark btn-sm" onClick={() => openEstimate('UPVC Cupboards')}><i className="bi bi-arrow-up-right me-1"></i>Check Collection</button></article></div>
              <div className="col-12 col-md-4"><article className="upvc-card featured"><div className="upvc-icon"><i className="bi bi-fire"></i></div><h3>Termite-Proof UPVC Modular Kitchens</h3><p>Fire-retardant, water-proof kitchens engineered for everyday Indian cooking and made for lifetime durability.</p><a className="btn btn-light btn-sm" href="https://wa.me/919852634252?text=I%20want%20an%20UPVC%20modular%20kitchen" target="_blank" rel="noopener noreferrer"><i className="bi bi-whatsapp me-1"></i>Enquire on WhatsApp</a></article></div>
              <div className="col-12 col-md-4"><article className="upvc-card"><div className="upvc-icon"><i className="bi bi-stars"></i></div><h3>Luxury UPVC Bedroom Interiors</h3><p>Elegant bedrooms with easy-clean surfaces, strong hardware, and timeless storage that stays beautiful for years.</p><button className="btn btn-outline-dark btn-sm" onClick={() => openEstimate('UPVC Bedroom Interiors')}><i className="bi bi-arrow-up-right me-1"></i>Check Collection</button></article></div>
            </div>
          </div>
        </section>

        <section id="categories" className="categories-section py-5"><div className="container"><div className="d-flex justify-content-between align-items-end mb-4"><div><p className="eyebrow">THE FKW EDIT</p><h2>Made for modern Indian homes.</h2></div><span className="category-count">04 / 04</span></div><div className="row g-4">{categories.map((category) => <div className="col-12 col-md-6 col-lg-3" key={category.name}><article className="category-card"><img src={category.image} alt={`${category.name} custom furniture`} loading="lazy" /><div className="category-overlay"><i className={`bi ${category.icon}`}></i><h3>{category.name}</h3><button className="btn btn-light btn-sm" onClick={() => openEstimate(category.name)}>Explore Store <i className="bi bi-arrow-up-right ms-1"></i></button></div></article></div>)}</div></div></section>

        <section className="projects-section py-5" aria-labelledby="projects-heading"><div className="container"><p className="eyebrow">RECENT PROJECTS</p><h2 id="projects-heading">Spaces we shaped for real homes.</h2><div className="row g-4 mt-2"><div className="col-12 col-md-6"><article className="project-card"><img src="/images/upvc-wardrobe.jpg" alt="Custom UPVC wardrobe and bedroom interior" loading="lazy" /><div><h3>Custom UPVC Wardrobe</h3><p>Clean, durable storage designed around your room.</p></div></article></div><div className="col-12 col-md-6"><article className="project-card"><img src="/images/tv-unit.jpg" alt="Modern custom TV unit and living room interior" loading="lazy" /><div><h3>Modern TV Unit</h3><p>Warm wood tones with smart, functional storage.</p></div></article></div></div></div></section>
      </main>

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
      <footer className="bg-dark text-light py-3 mt-auto">
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