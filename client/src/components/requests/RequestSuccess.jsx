import React from 'react';
import { Link } from 'react-router-dom';

const RequestSuccess = () => {
  return (
    <div className="success-page">
      <h1>Request Submitted Successfully</h1>
      <p>Your assistance request has been received. We will review it shortly.</p>
      <p>Thank you for your patience.</p>
      <Link to="/" className="back-home">
        Back to Home
      </Link>
    </div>
  );
};

export default RequestSuccess; 