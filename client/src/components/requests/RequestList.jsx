import React, { useEffect, useState } from 'react';
import { Table, Card, message, Tag } from 'antd';
import './RequestList.css'; // Import the CSS file for additional styling
import axios from 'axios';  // Add this import

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests`);
        console.log('Response status:', response.status);
        console.log('Fetched requests:', response.data);
        setRequests(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch requests';
        message.error(errorMessage);
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);
  // Define columns for the table
  const columns = [
    {
      title: 'Applicant Name',
      dataIndex: 'applicantName',
      key: 'applicantName',
      width: 150,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 150,
    },
    {
      title: 'Family Members',
      dataIndex: 'familyMembersCount',
      key: 'familyMembersCount',
      width: 120,
    },
    {
      title: 'Assistance Type',
      dataIndex: 'assistanceTypeId',
      key: 'assistanceTypeId',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        let color;
        switch (status) {
          case 'pending':
            color = 'gold';
            break;
          case 'approved':
            color = 'green';
            break;
          case 'rejected':
            color = 'red';
            break;
          case 'completed':
            color = 'blue';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Date Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  // Transform requests into the format expected by the Table
  const dataSource = requests.map(request => ({
    key: request.id,
    ...request
  }));

  return (
    <Card 
      title="Assistance Requests" 
      style={{ margin: '20px' }}
    >
      <div style={{ overflowX: 'auto' }}>
        <Table 
          dataSource={dataSource} 
          columns={columns} 
          loading={loading}
          pagination={{ pageSize: 10 }}
          rowClassName={(record) => `status-${record.status}`}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </Card>
  );
};

export default RequestList; 