import React, { useState } from 'react';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSignup = () => {
    // Replace with actual API call
    alert('Signup successful!');
  };

  return (
    <div className="container mt-5">
      <h3>Signup</h3>
      <input className="form-control mb-3" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="form-control mb-3" type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
      <button className="btn btn-success" onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default SignupPage;
