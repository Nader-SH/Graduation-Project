import React, { useState, useEffect } from 'react';
import { authService } from '../../services/apiService';

function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await authService.getRequests();
        setRequests(data);
      } catch (error) {
        setError('Failed to load requests');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);
  
  const updateRequestStatus = async (id, status) => {
    try {
      await authService.updateRequestStatus(id, { status });
      // Update local state after successful update
      setRequests(requests.map(req => 
        req.id === id ? {...req, status} : req
      ));
    } catch (error) {
      setError('Failed to update request status');
      console.error(error);
    }
  };
  
  if (loading) return <div>Loading requests...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="admin-requests">
      <h2>Manage Assistance Requests</h2>
      
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant Name</th>
            <th>National ID</th>
            <th>Family Members</th>
            <th>Location</th>
            <th>Assistance Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="8">No requests found</td>
            </tr>
          ) : (
            requests.map(request => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.applicantName}</td>
                <td>{request.nationalId}</td>
                <td>{request.familyMembersCount}</td>
                <td>{request.location}</td>
                <td>{request.assistanceType?.name || 'Unknown'}</td>
                <td>{request.status}</td>
                <td>
                  <select 
                    value={request.status}
                    onChange={(e) => updateRequestStatus(request.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList; 