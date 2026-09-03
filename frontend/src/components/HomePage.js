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
  const openEstimate = (category = selectedCategory) => { setSelectedCategory(category); setShowBookingModal(true); };

  return (
    <div className="dashboard-page">
      <main className="dashboard-shell">
        <section className="dashboard-intro">
          <div>
            <p className="dashboard-kicker"><span className="live-dot"></span> FKW WORKSPACE / PATNA</p>
            <h1>Good morning, <span>let's build.</span></h1>
            <p className="dashboard-subtitle">Track your space transformation and find the right craft for your next project.</p>
          </div>
          <button className="dashboard-primary" type="button" onClick={() => openEstimate()}><i className="bi bi-plus-lg"></i> Start a project</button>
        </section>

        <section className="metric-grid" aria-label="Workspace summary">
          <article className="metric-card"><div className="metric-icon green"><i className="bi bi-check2-circle"></i></div><p>Projects completed</p><strong>128</strong><span className="metric-up"><i className="bi bi-arrow-up"></i> 12.8% this year</span></article>
          <article className="metric-card"><div className="metric-icon red"><i className="bi bi-lightning-charge-fill"></i></div><p>Average response</p><strong>24<span>h</span></strong><span className="metric-up"><i className="bi bi-arrow-down"></i> 8h faster</span></article>
          <article className="metric-card"><div className="metric-icon dark"><i className="bi bi-star-fill"></i></div><p>Craft quality score</p><strong>4.9<span>/5</span></strong><span className="metric-neutral">From 86 verified reviews</span></article>
          <article className="metric-card metric-callout"><p>Have a space in mind?</p><strong>Turn the idea into a plan.</strong><button type="button" onClick={() => openEstimate()}>Get a free estimate <i className="bi bi-arrow-up-right"></i></button></article>
        </section>

        <div className="dashboard-grid">
          <section className="workspace-panel progress-panel" aria-labelledby="progress-heading">
            <div className="panel-heading"><div><p className="panel-label">YOUR ACTIVE PLAN</p><h2 id="progress-heading">Living room refresh</h2></div><span className="status-pill"><span></span> In progress</span></div>
            <div className="progress-visual"><div className="progress-ring"><strong>68%</strong><span>complete</span></div><div className="progress-copy"><p>Designed for <strong>Sharma residence</strong></p><div className="bar-track"><span style={{ width: '68%' }}></span></div><small>3 of 4 milestones complete</small></div></div>
            <div className="milestones"><div className="milestone done"><i className="bi bi-check-lg"></i><span>Brief shared</span></div><div className="milestone done"><i className="bi bi-check-lg"></i><span>Design approved</span></div><div className="milestone active"><i className="bi bi-tools"></i><span>Crafting underway</span></div><div className="milestone"><i className="bi bi-house-check"></i><span>Installation</span></div></div>
          </section>

          <section className="workspace-panel category-panel" id="categories" aria-labelledby="category-heading">
            <div className="panel-heading"><div><p className="panel-label">EXPLORE SERVICES</p><h2 id="category-heading">Choose your craft</h2></div><span className="panel-index">01—04</span></div>
            <div className="craft-list">{categories.map((category, index) => <button type="button" className={`craft-item ${selectedCategory === category.name ? 'selected' : ''}`} key={category.name} onClick={() => setSelectedCategory(category.name)}><span className="craft-number">0{index + 1}</span><span className="craft-icon"><i className={`bi ${category.icon}`}></i></span><span className="craft-name">{category.name}</span><i className="bi bi-arrow-up-right craft-arrow"></i></button>)}</div>
            <button className="panel-link" type="button" onClick={() => openEstimate()}>{selectedCategory} selected <i className="bi bi-arrow-right"></i></button>
          </section>

          <section className="workspace-panel jobs-panel" aria-labelledby="jobs-heading">
            <div className="panel-heading"><div><p className="panel-label">RECENT ACTIVITY</p><h2 id="jobs-heading">Your projects</h2></div><button className="icon-button" aria-label="View all projects" type="button"><i className="bi bi-three-dots"></i></button></div>
            <div className="job-table"><div className="job-row"><div className="job-thumb wardrobe-thumb"></div><div className="job-detail"><strong>UPVC wardrobe</strong><span>Sharma residence · Aug 2024</span></div><span className="job-status complete">Completed</span><i className="bi bi-chevron-right"></i></div><div className="job-row"><div className="job-thumb kitchen-thumb"></div><div className="job-detail"><strong>Modular kitchen</strong><span>Gupta apartment · Jul 2024</span></div><span className="job-status review">In review</span><i className="bi bi-chevron-right"></i></div><div className="job-row"><div className="job-thumb sofa-thumb"></div><div className="job-detail"><strong>Custom sofa set</strong><span>Verma residence · Jun 2024</span></div><span className="job-status complete">Completed</span><i className="bi bi-chevron-right"></i></div></div>
          </section>

          <aside className="workspace-panel next-panel"><div className="next-pattern"></div><p className="panel-label">NEXT BEST STEP</p><div className="next-content"><span className="next-icon"><i className="bi bi-chat-square-heart-fill"></i></span><h2>Start with a conversation.</h2><p>Tell us what you are imagining. We will shape the details together.</p><button className="dashboard-primary" type="button" onClick={() => openEstimate()}>Book a consultation <i className="bi bi-arrow-up-right"></i></button></div></aside>
        </div>
      </main>

      {showBookingModal && (
        <div className="modal d-block dashboard-modal" tabIndex="-1" role="dialog" aria-modal="true">
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

      <footer className="dashboard-footer">Furniture kaamwallah.in <span>•</span> Patna, Bihar <span>•</span> <small>© {new Date().getFullYear()}</small></footer>
    </div>
  );
}

export default HomePage;