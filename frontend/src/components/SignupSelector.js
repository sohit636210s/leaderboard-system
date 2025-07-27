import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupSelector() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">⚡ रजिस्ट्रेशन चुनें / Select Registration Type</h3>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <button className="btn btn-primary w-100" onClick={() => navigate('/worker-signup')}>
            👷 काम करने वाला (Register as Worker)
          </button>
        </div>
        <div className="col-md-4">
          <button className="btn btn-success w-100" onClick={() => navigate('/customer-signup')}>
            🧑‍💼 काम करवाने वाला (Register as Customer)
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupSelector;
