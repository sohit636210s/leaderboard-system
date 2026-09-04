import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../api';

function WorkerSignup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', contact: '', address: '', pincode: '', skill: '' });
  const [registeredWorker, setRegisteredWorker] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(previous => ({ ...previous, [name]: value }));
    setErrorMsg('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/workers/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        address: formData.address,
        pincode: formData.pincode,
        skill: formData.skill
      });
      setRegisteredWorker(response.data.worker || formData);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registeredWorker) {
    return <main className="worker-signup-page"><section className="worker-signup-success" role="status"><div className="success-icon"><i className="bi bi-check-lg"></i></div><p className="worker-signup-kicker">FURNITURE KAAM WALLAH / TEAM</p><h1>Signup successful!</h1><p className="success-lead">Your worker account has been created successfully.</p><div className="registered-profile"><p><strong>Name</strong><span>{registeredWorker.name}</span></p><p><strong>Phone</strong><span>{registeredWorker.contact}</span></p><p><strong>Email</strong><span>{registeredWorker.email}</span></p></div><p className="success-note">You can log in now. Your profile photo can be uploaded after login.</p><Link to="/worker-login" className="worker-signup-submit">Continue to Worker Login</Link></section></main>;
  }

  const fields = [
    { name: 'name', label: 'Full name', placeholder: 'Your full name' },
    { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email' },
    { name: 'password', label: 'Password', placeholder: 'Create a password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm password', placeholder: 'Repeat your password', type: 'password' },
    { name: 'contact', label: 'Phone number', placeholder: '10-digit mobile number', inputMode: 'tel' },
    { name: 'address', label: 'Full address', placeholder: 'Your working address' },
    { name: 'pincode', label: 'Area pincode', placeholder: '6-digit pincode', inputMode: 'numeric' }
  ];

  return <main className="worker-signup-page"><section className="worker-signup-card"><div className="worker-signup-heading"><span className="worker-signup-icon"><i className="bi bi-person-workspace"></i></span><div><p className="worker-signup-kicker">FURNITURE KAAM WALLAH / TEAM</p><h1>Join as a skilled worker.</h1><p>Register as a carpenter or furniture professional. Upload your photo later after login.</p></div></div><form onSubmit={handleSubmit}><div className="worker-signup-grid">{fields.map(field => <label key={field.name}>{field.label}<input className="worker-signup-input" name={field.name} type={field.type || 'text'} inputMode={field.inputMode} value={formData[field.name]} onChange={handleChange} placeholder={field.placeholder} required /></label>)}</div><label>Skill<select className="worker-signup-input" name="skill" value={formData.skill} onChange={handleChange} required><option value="">Select your skill</option>{['Carpenter', 'Electrician', 'Plumber', 'Painter', 'Other'].map(skill => <option key={skill}>{skill}</option>)}</select></label><p className="worker-signup-note"><i className="bi bi-camera"></i> Profile photo upload is available after login.</p><button className="worker-signup-submit" disabled={isSubmitting}>{isSubmitting ? <><span className="signup-spinner"></span> Creating your account...</> : <><i className="bi bi-person-plus me-2"></i> Create worker account</>}</button></form>{errorMsg && <div className="worker-signup-error" role="alert"><i className="bi bi-exclamation-circle"></i>{errorMsg}</div>}</section></main>;
}

export default WorkerSignup;
