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
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [locationText, setLocationText] = useState('');

  const handleChange = event => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }));

  const handleLocationTextChange = event => {
    const value = event.target.value;
    const lines = value.split(/\r?\n/);
    const lastLine = lines[lines.length - 1].trim();
    const postcode = lastLine.match(/^(?:pincode|pin code)\s*:\s*([1-9]\d{5})$/i)?.[1] || '';
    const address = (postcode ? lines.slice(0, -1).join('\n') : value).trim();

    setLocationText(value);
    setFormData(previous => ({ ...previous, address, pincode: postcode }));
    setLocationMessage('');
  };

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage('Location is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    setLocationMessage('');
    setLocationText('');
    setFormData(previous => ({ ...previous, address: '', pincode: '' }));

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      try {
        const query = new URLSearchParams({
          format: 'jsonv2',
          lat: String(coords.latitude),
          lon: String(coords.longitude),
          zoom: '18',
          addressdetails: '1'
        });
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${query}`);
        if (!response.ok) {
          throw new Error('Address lookup failed. Please try fetching your location again.');
        }

        const result = await response.json();
        const postcode = String(result.address?.postcode || '')
          .replace(/\s+/g, '')
          .match(/(?:^|\D)([1-9]\d{5})(?:\D|$)/)?.[1];
        const address = result.display_name?.trim();

        if (!address || !postcode) {
          setLocationMessage('We could not find an address and 6-digit pincode for this location. Try again in an area with a clearer GPS signal.');
          return;
        }

        setFormData(previous => ({ ...previous, address, pincode: postcode }));
        setLocationText(`${address}\nPincode: ${postcode}`);
        setLocationMessage('Current location detected.');
      } catch (error) {
        console.error('Could not look up the current location:', error);
        setLocationMessage(error.message || 'Could not look up your location. Check your internet connection and try again.');
      } finally {
        setIsLocating(false);
      }
    }, error => {
      const errorMessages = {
        1: 'Location permission was denied. Allow location access in your browser settings and try again.',
        2: 'Your location could not be determined. Check your GPS or network and try again.',
        3: 'The location request timed out. Please try again.'
      };
      setLocationMessage(errorMessages[error.code] || 'Could not access your current location. Please try again.');
      setIsLocating(false);
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (!formData.address || !/^[1-9]\d{5}$/.test(formData.pincode)) {
      setLocationMessage('Enter an address and valid 6-digit pincode in the location box before submitting.');
      return;
    }

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
      setSubmissionMessage(serverMessage ? `Booking failed: ${serverMessage}` : 'The server could not be reached. Please call 6362107408, available 24 hours.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <main className="booking-page booking-search-state"><div className="booking-result-screen"><span className="booking-search-spinner"><i className="bi bi-search"></i></span><p className="booking-kicker">SEARCHING NEARBY</p><h1>Finding an available carpenter...</h1><p>We are checking workers near pincode <strong>{formData.pincode}</strong>.</p></div></main>;
  }

  if (submittedBooking) {
    return <main className="booking-page booking-result-state"><div className="booking-result-screen"><span className="booking-success-icon"><i className="bi bi-check-lg"></i></span><p className="booking-kicker">REQUEST SUBMITTED</p><h1>Your booking request is saved.</h1><div className="booking-result-message"><i className={`bi ${availableWorkers.length ? 'bi-person-check-fill' : 'bi-info-circle-fill'}`}></i><span>{submissionMessage}</span></div><div className="booking-summary booking-summary-screen"><p className="booking-kicker">YOUR DETAILS</p><div><span>Name<strong>{submittedBooking.customerName}</strong></span><span>Service<strong>{submittedBooking.service}</strong></span><span>Phone<strong>{submittedBooking.contact}</strong></span><span>Location<strong>{submittedBooking.pincode}</strong></span></div></div>{availableWorkers.length > 0 && <div className="booking-workers booking-workers-screen"><h3><i className="bi bi-person-check-fill"></i> Available carpenters near you</h3>{availableWorkers.map(worker => <div key={worker._id || worker.contact} className="booking-worker"><div><strong>{worker.name}</strong>{worker.verified && <span className="booking-verified">Verified</span>}<small>{worker.city || 'Nearby'} · Pincode {worker.pincode}</small></div><a href={`tel:${worker.contact}`}><i className="bi bi-telephone-fill"></i> Call {worker.contact}</a></div>)}</div>}{availableWorkers.length === 0 && <a href="tel:6362107408" className="booking-result-call"><i className="bi bi-telephone-fill"></i> Call 6362107408 for assistance</a>}<Link to="/" className="booking-home-link"><i className="bi bi-arrow-left"></i> Back to homepage</Link></div></main>;
  }

  return (
    <main className="booking-page">
      <div className="booking-container">
        <section className="booking-form-card booking-form-only"><div className="booking-card-heading"><span className="booking-icon"><i className="bi bi-hammer"></i></span><div><p className="booking-kicker">FURNITURE KAAM WALLAH</p><h2>Book your furniture work</h2><span>Selected service: <strong>{selectedService}</strong></span></div></div>
            <form onSubmit={handleSubmit}>
              <div className="booking-form-grid"><label>Name<input className="booking-input" name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Your full name" required /></label><label>Phone<input className="booking-input" name="contact" value={formData.contact} onChange={handleChange} inputMode="tel" placeholder="10-digit mobile number" required /></label></div>
              <div className="booking-location-field">
                <label htmlFor="booking-location">Address and pincode</label>
                <div className="booking-location-control">
                  <textarea id="booking-location" className="booking-input booking-location-input" value={locationText} onChange={handleLocationTextChange} onClick={() => { if (!locationText.trim() && !locationMessage) handleFetchLocation(); }} placeholder="Click here to fetch your current location" rows="2" disabled={isLocating || isSubmitting} aria-describedby="booking-location-attribution booking-location-message" />
                  <button type="button" className="booking-location-action" onClick={handleFetchLocation} disabled={isLocating || isSubmitting} aria-label={isLocating ? 'Fetching your current location' : formData.address ? 'Update current location' : 'Fetch current location'}>
                    <i className={`bi ${isLocating ? 'bi-arrow-repeat' : 'bi-geo-alt'}`}></i>
                  </button>
                </div>
                {isLocating && <span id="booking-location-message" className="booking-location-message" role="status">Fetching your current location...</span>}
                <span id="booking-location-attribution" className="booking-location-attribution">Location lookup by <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a></span>
                {locationMessage && <span id="booking-location-message" className={`booking-location-message ${locationMessage === 'Current location detected.' ? 'success' : ''}`} role="status">{locationMessage}</span>}
              </div>
              <label>Tell us about the work<textarea className="booking-input" name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Wardrobe, kitchen, bedroom, hall or UPVC work" rows="4" required /></label>
              <button className="booking-submit" disabled={isSubmitting || isLocating}><i className="bi bi-send-check me-2"></i>{isSubmitting ? 'Submitting request...' : 'Submit booking request'}</button>
            </form>
          </section>
      </div>
    </main>
  );
}

export default BookingForm;
