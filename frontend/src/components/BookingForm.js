import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import API_BASE_URL from '../api';

function BookingForm() {
  const location = useLocation();
  const selectedService = location.state?.service || 'Furniture work';
  const [formData, setFormData] = useState({ customerName: '', contact: '', address: '', pincode: '', jobDescription: '' });
  const [availableWorkers, setAvailableWorkers] = useState([]);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }));

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings/book`, formData);
      const workers = response.data.availableWorkers || (response.data.matchedWorker ? [response.data.matchedWorker] : []);
      setAvailableWorkers(workers);
      setSubmittedBooking({ ...formData, service: selectedService });
      setSubmissionMessage(workers.length ? 'Your request is saved. Available carpenters near your pincode are listed below.' : 'Your request is saved, but no carpenter is available near your pincode right now.');
    } catch (error) {
      const serverMessage = error.response?.data?.error || error.response?.data?.message;
      setSubmissionMessage(serverMessage ? `Booking failed: ${serverMessage}` : 'The server could not be reached. Please call 63621074008, available 24 hours.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="booking-page">
      <div className="booking-container">
        <div className="booking-breadcrumb"><Link to="/">Furniture Kaam Wallah</Link><span>/</span> Book furniture work</div>
        <section className="booking-intro"><div><p className="booking-kicker"><span></span> FURNITURE KAAM WALLAH / 24-HOUR SERVICE</p><h1>Let&apos;s build your <strong>perfect space.</strong></h1><p>Share your requirement and we will find available carpenters near your pincode.</p></div><a href="tel:63621074008" className="booking-call"><i className="bi bi-telephone-fill"></i><span>Need help?<strong>63621074008</strong></span></a></section>
        <div className="booking-layout">
          <section className="booking-form-card"><div className="booking-card-heading"><span className="booking-icon"><i className="bi bi-hammer"></i></span><div><p className="booking-kicker">START A REQUEST</p><h2>Book your furniture work</h2><span>Selected service: <strong>{selectedService}</strong></span></div></div>
            <form onSubmit={handleSubmit}>
              <div className="booking-form-grid"><label>Name<input className="booking-input" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Your full name" required /></label><label>Phone<input className="booking-input" name="contact" value={formData.contact} onChange={handleChange} inputMode="tel" placeholder="10-digit mobile number" required /></label></div>
              <label>Address<input className="booking-input" name="address" value={formData.address} onChange={handleChange} placeholder="House, street and city" required /></label>
              <label>Pincode<input className="booking-input" name="pincode" value={formData.pincode} onChange={handleChange} inputMode="numeric" maxLength="6" placeholder="6-digit area pincode" required /></label>
              <label>Tell us about the work<textarea className="booking-input" name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Wardrobe, kitchen, bedroom, hall or UPVC work" rows="4" required /></label>
              <button className="booking-submit" disabled={isSubmitting}><i className="bi bi-send-check me-2"></i>{isSubmitting ? 'Submitting request...' : 'Submit booking request'}</button>
            </form>
            {submissionMessage && <div className={`booking-result ${availableWorkers.length ? 'has-workers' : 'no-workers'}`}><i className={`bi ${availableWorkers.length ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}`}></i><span>{submissionMessage}</span></div>}
            {submittedBooking && <div className="booking-summary"><p className="booking-kicker">REQUEST RECEIVED</p><h3>Your details are saved</h3><div><span>Name<strong>{submittedBooking.customerName}</strong></span><span>Service<strong>{submittedBooking.service}</strong></span><span>Location<strong>{submittedBooking.pincode}</strong></span></div></div>}
            {availableWorkers.length > 0 && <div className="booking-workers"><h3><i className="bi bi-person-check-fill"></i> Available carpenters near you</h3>{availableWorkers.map(worker => <div key={worker._id || worker.contact} className="booking-worker"><div><strong>{worker.name}</strong>{worker.verified && <span className="booking-verified">Verified</span>}<small>{worker.city || 'Nearby'} · Pincode {worker.pincode}</small></div><a href={`tel:${worker.contact}`}><i className="bi bi-telephone-fill"></i> Call {worker.contact}</a></div>)}</div>}
          </section>
          <aside className="booking-side"><div><i className="bi bi-shield-check"></i><h2>Craftspeople near you</h2><p>We match your pincode with available carpenters. Their contact details appear after your request is saved.</p></div><div className="booking-side-list"><span><i className="bi bi-check2"></i> Pincode-based matching</span><span><i className="bi bi-check2"></i> 24-hour support</span><span><i className="bi bi-check2"></i> Wardrobe, kitchen, bedroom and UPVC work</span></div></aside>
        </div>
      </div>
    </main>
  );
}

export default BookingForm;
