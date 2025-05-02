import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleTwoTone } from '@ant-design/icons';
import './RequestSuccess.css';

const RequestSuccess = () => {
  return (
    <div className="success-page">
      <div className="success-card">
        <CheckCircleTwoTone twoToneColor="#52c41a" className="success-icon" />
        <h1 className="success-title">Request Submitted Successfully</h1>
        <p className="success-message">Your assistance request has been received. We will review it shortly.</p>
        <p className="success-message">Thank you for your patience and trust in our platform.</p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RequestSuccess; 