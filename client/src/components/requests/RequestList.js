import React, { useEffect, useState } from 'react';
import { List, Card, message } from 'antd';
import './RequestList.css'; // Import the CSS file for additional styling

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests');
        if (!response.ok) throw new Error('Failed to fetch requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        message.error(error.message);
      }
    };

    fetchRequests();
  }, []);

  const getRequestStyle = (status) => {
    switch (status) {
      case 'pending':
        return { backgroundColor: '#fff3cd', color: '#856404' }; // Yellow for pending
      case 'approved':
        return { backgroundColor: '#d4edda', color: '#155724' }; // Green for approved
      case 'rejected':
        return { backgroundColor: '#f8d7da', color: '#721c24' }; // Red for rejected
      case 'completed':
        return { backgroundColor: '#cce5ff', color: '#004085' }; // Blue for completed
      default:
        return {};
    }
  };

  return (
    <Card title="Requests" style={{ maxWidth: 600, margin: '40px auto' }}>
      <List
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={request => (
          <List.Item style={getRequestStyle(request.status)}>
            <List.Item.Meta
              title={request.applicantName}
              description={`Location: ${request.location}, Assistance Type: ${request.assistanceTypeId}, Status: ${request.status}`}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default RequestList; 