import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WORK_HIGHLIGHTS = [
  { title: 'Carpenter work near Patna', text: 'Wardrobe fitting and custom furniture in progress.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=240&q=80' },
  { title: 'UPVC kitchen installation', text: 'Durable kitchen storage made for everyday homes.', image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=240&q=80' },
  { title: 'Bedroom furniture setup', text: 'Palang, wardrobe and bedroom interiors by our team.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=240&q=80' }
];

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Modular Kitchen');
  const [workSpotlight, setWorkSpotlight] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = window.setInterval(() => setWorkSpotlight(index => (index + 1) % WORK_HIGHLIGHTS.length), 2000);
    return () => window.clearInterval(timer);
  }, []);

  const categories = [
    { name: 'Modular Kitchen', icon: 'bi-grid-3x3-gap-fill', image: 'modular-kitchen.jpg' },
    { name: 'Luxury Sofa', icon: 'bi-house-heart-fill', image: 'luxury-sofa.jpg' },
    { name: 'King Size Bed', icon: 'bi-moon-stars-fill', image: 'king-size-bed.jpg' },
    { name: 'Wardrobe', icon: 'bi-box-seam-fill', image: 'upvc-wardrobe.jpg' }
  ];
  const openEstimate = (category = selectedCategory) => { setSelectedCategory(category); navigate('/booking', { state: { service: category } }); };

  return (
    <div className="dashboard-page">
      <main className="dashboard-shell">
        <section className="dashboard-intro">
          <div>
            <p className="dashboard-kicker"><span className="live-dot"></span> FURNITURE KAAM WALLAH / PATNA</p>
            <h1>Build your space <span>beautifully.</span></h1>
            <p className="dashboard-subtitle">Custom wardrobes, modular kitchens, bedrooms, halls and UPVC cupboards, made by trusted furniture professionals.</p>
          </div>
          <button className="dashboard-primary" type="button" onClick={() => openEstimate()}><i className="bi bi-calendar2-check"></i> Book your work</button>
        </section>

        <section className="official-work-spotlight" aria-live="polite">
          <img src={WORK_HIGHLIGHTS[workSpotlight].image} alt="Furniture work in progress" />
          <div><p><span className="live-dot"></span> WORK HAPPENING NEAR YOU</p><strong>{WORK_HIGHLIGHTS[workSpotlight].title}</strong><span>{WORK_HIGHLIGHTS[workSpotlight].text}</span></div>
          <div className="spotlight-dots">{WORK_HIGHLIGHTS.map((highlight, index) => <i key={highlight.title} className={index === workSpotlight ? 'active' : ''}></i>)}</div>
        </section>

        <section className="metric-grid" aria-label="Workspace summary">
          <article className="metric-card"><div className="metric-icon green"><i className="bi bi-check2-circle"></i></div><p>Projects completed</p><strong>128</strong><span className="metric-up"><i className="bi bi-arrow-up"></i> 12.8% this year</span></article>
          <article className="metric-card"><div className="metric-icon red"><i className="bi bi-lightning-charge-fill"></i></div><p>Average response</p><strong>24<span>h</span></strong><span className="metric-up"><i className="bi bi-arrow-down"></i> 8h faster</span></article>
          <article className="metric-card"><div className="metric-icon dark"><i className="bi bi-star-fill"></i></div><p>Craft quality score</p><strong>4.9<span>/5</span></strong><span className="metric-neutral">From 86 verified reviews</span></article>
          <article className="metric-card metric-callout"><p>Have a space in mind?</p><strong>Tell us what you want to build.</strong><button type="button" onClick={() => openEstimate()}>Book now <i className="bi bi-arrow-up-right"></i></button></article>
        </section>

        <div className="dashboard-grid">
          <section className="workspace-panel progress-panel" aria-labelledby="progress-heading">
            <div className="panel-heading"><div><p className="panel-label">YOUR ACTIVE PLAN</p><h2 id="progress-heading">Living room refresh</h2></div><span className="status-pill"><span></span> In progress</span></div>
            <div className="progress-visual"><div className="progress-ring"><strong>68%</strong><span>complete</span></div><div className="progress-copy"><p>Designed for <strong>Sharma residence</strong></p><div className="bar-track"><span style={{ width: '68%' }}></span></div><small>3 of 4 milestones complete</small></div></div>
            <div className="milestones"><div className="milestone done"><i className="bi bi-check-lg"></i><span>Brief shared</span></div><div className="milestone done"><i className="bi bi-check-lg"></i><span>Design approved</span></div><div className="milestone active"><i className="bi bi-tools"></i><span>Crafting underway</span></div><div className="milestone"><i className="bi bi-house-check"></i><span>Installation</span></div></div>
          </section>

          <section className="workspace-panel category-panel" id="categories" aria-labelledby="category-heading">
            <div className="panel-heading"><div><p className="panel-label">OUR FURNITURE SERVICES</p><h2 id="category-heading">Choose your work</h2></div><span className="panel-index">01—04</span></div>
            <div className="craft-list">{categories.map((category, index) => <button type="button" className={`craft-item ${selectedCategory === category.name ? 'selected' : ''}`} key={category.name} onClick={() => setSelectedCategory(category.name)}><span className="craft-number">0{index + 1}</span><span className="craft-icon"><i className={`bi ${category.icon}`}></i></span><span className="craft-name">{category.name}</span><i className="bi bi-arrow-up-right craft-arrow"></i></button>)}</div>
            <button className="panel-link" type="button" onClick={() => openEstimate()}>{selectedCategory} selected <i className="bi bi-arrow-right"></i></button>
          </section>

          <section className="workspace-panel jobs-panel" aria-labelledby="jobs-heading">
            <div className="panel-heading"><div><p className="panel-label">RECENT ACTIVITY</p><h2 id="jobs-heading">Your projects</h2></div><button className="icon-button" aria-label="View all projects" type="button"><i className="bi bi-three-dots"></i></button></div>
            <div className="job-table"><div className="job-row"><div className="job-thumb wardrobe-thumb"></div><div className="job-detail"><strong>UPVC wardrobe</strong><span>Sharma residence · Aug 2024</span></div><span className="job-status complete">Completed</span><i className="bi bi-chevron-right"></i></div><div className="job-row"><div className="job-thumb kitchen-thumb"></div><div className="job-detail"><strong>Modular kitchen</strong><span>Gupta apartment · Jul 2024</span></div><span className="job-status review">In review</span><i className="bi bi-chevron-right"></i></div><div className="job-row"><div className="job-thumb sofa-thumb"></div><div className="job-detail"><strong>Custom sofa set</strong><span>Verma residence · Jun 2024</span></div><span className="job-status complete">Completed</span><i className="bi bi-chevron-right"></i></div></div>
          </section>

          <aside className="workspace-panel next-panel"><div className="next-pattern"></div><p className="panel-label">BOOK YOUR FURNITURE WORK</p><div className="next-content"><span className="next-icon"><i className="bi bi-chat-square-heart-fill"></i></span><h2>Let us build it for you.</h2><p>Book a carpenter online or call us 24 hours a day.</p><a href="tel:63621074008" className="next-phone"><i className="bi bi-telephone-fill"></i> 63621074008</a><button className="dashboard-primary" type="button" onClick={() => openEstimate()}>Book now <i className="bi bi-arrow-up-right"></i></button></div></aside>
        </div>
      </main>

      <footer className="dashboard-footer official-footer"><div className="official-footer-brand">Furniture Kaam Wallah <small>Custom furniture, wardrobes, kitchens and UPVC interiors.</small></div><nav><Link to="/">Home</Link><Link to="/about">About Us</Link><Link to="/shopping">Shopping</Link><Link to="/contact">Contact</Link><Link to="/booking">Book Furniture Work</Link><a href="tel:63621074008">Call 63621074008</a></nav><div className="official-footer-bottom">Patna, Bihar <span>•</span> Available 24 hours <span>•</span> <small>© {new Date().getFullYear()} Furniture Kaam Wallah</small></div></footer>
    </div>
  );
}

export default HomePage;