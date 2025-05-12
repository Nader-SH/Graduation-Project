import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'antd';
import './RequestDetails.css';

export default function RequestDetails() {
  const { id } = useParams();
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests/${id}`);
        setRequest(response.data.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching request:', err);
        setRequest([]);
        setError(err.response?.data?.message || 'Error fetching request details');
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!request || request.length === 0) {
    return <div className="not-found">No request data available</div>;
  }

  return (
    <div className="request-details-container">
      <div className="request-details-content">
        <h1 className="request-title">{request.applicantName}'s Story</h1>
        
        <div className="request-info">
          <div className="info-section">
            <h2>About the Family</h2>
            <p><strong>Family Members:</strong> {request.familyMembersCount || 'N/A'}</p>
            <p><strong>Head of Family Status:</strong> {request.headOfFamilyStatus || 'N/A'}</p>
            <p><strong>Location:</strong> {request.location || 'N/A'}</p>
          </div>

          <div className="info-section">
            <h2>Request Details</h2>
            <p><strong>Type of Assistance:</strong> {request.assistanceType || 'N/A'}</p>
            <p><strong>Status:</strong> <span className={`status-${request.status || 'pending'}`}>{request.status || 'Pending'}</span></p>
            <p><strong>Description:</strong></p>
            <p className="description">{request.description || 'No description available'}</p>
          </div>
        </div>

        <div className="request-actions">
          <button className="btn btn-primary">Donate to This Case</button>
          <button className="btn btn-outline">Contact Support</button>
        </div>
      </div>
    </div>
  );
} 