import React, { useState } from 'react';
import { Table, Card, Tag } from 'antd';
import './RequestList.css';

// Mock data for requests
const mockRequests = [
  {
    id: '1',
    applicantName: 'Mohammad Ali',
    location: 'Beirut, Lebanon',
    familyMembersCount: 4,
    assistanceTypeId: 'Medical Aid',
    status: 'pending',
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: '2',
    applicantName: 'Fatima Hassan',
    location: 'Tripoli, Lebanon',
    familyMembersCount: 6,
    assistanceTypeId: 'Food Assistance',
    status: 'approved',
    createdAt: '2024-02-14T15:30:00Z'
  },
  {
    id: '3',
    applicantName: 'Ahmed Khalil',
    location: 'Sidon, Lebanon',
    familyMembersCount: 3,
    assistanceTypeId: 'Shelter Support',
    status: 'rejected',
    createdAt: '2024-02-13T09:15:00Z'
  },
  {
    id: '4',
    applicantName: 'Layla Ibrahim',
    location: 'Tyre, Lebanon',
    familyMembersCount: 5,
    assistanceTypeId: 'Financial Support',
    status: 'completed',
    createdAt: '2024-02-12T14:20:00Z'
  },
  {
    id: '5',
    applicantName: 'Youssef Mahmoud',
    location: 'Beirut, Lebanon',
    familyMembersCount: 2,
    assistanceTypeId: 'Medical Aid',
    status: 'pending',
    createdAt: '2024-02-11T11:45:00Z'
  },
  {
    id: '6',
    applicantName: 'Nour Abed',
    location: 'Zahle, Lebanon',
    familyMembersCount: 7,
    assistanceTypeId: 'Food Assistance',
    status: 'approved',
    createdAt: '2024-02-10T16:30:00Z'
  },
  {
    id: '7',
    applicantName: 'Rami Fares',
    location: 'Baalbek, Lebanon',
    familyMembersCount: 4,
    assistanceTypeId: 'Shelter Support',
    status: 'pending',
    createdAt: '2024-02-09T13:10:00Z'
  },
  {
    id: '8',
    applicantName: 'Maya Haddad',
    location: 'Jounieh, Lebanon',
    familyMembersCount: 3,
    assistanceTypeId: 'Financial Support',
    status: 'completed',
    createdAt: '2024-02-08T10:25:00Z'
  },
  {
    id: '9',
    applicantName: 'Karim Mansour',
    location: 'Beirut, Lebanon',
    familyMembersCount: 5,
    assistanceTypeId: 'Medical Aid',
    status: 'rejected',
    createdAt: '2024-02-07T08:15:00Z'
  },
  {
    id: '10',
    applicantName: 'Sara Nasser',
    location: 'Tripoli, Lebanon',
    familyMembersCount: 4,
    assistanceTypeId: 'Food Assistance',
    status: 'pending',
    createdAt: '2024-02-06T14:40:00Z'
  },
  {
    id: '11',
    applicantName: 'Omar Zein',
    location: 'Sidon, Lebanon',
    familyMembersCount: 6,
    assistanceTypeId: 'Shelter Support',
    status: 'approved',
    createdAt: '2024-02-05T09:20:00Z'
  },
  {
    id: '12',
    applicantName: 'Hala Farah',
    location: 'Tyre, Lebanon',
    familyMembersCount: 3,
    assistanceTypeId: 'Financial Support',
    status: 'completed',
    createdAt: '2024-02-04T16:45:00Z'
  },
  {
    id: '13',
    applicantName: 'Bassam Saleh',
    location: 'Beirut, Lebanon',
    familyMembersCount: 4,
    assistanceTypeId: 'Medical Aid',
    status: 'pending',
    createdAt: '2024-02-03T11:30:00Z'
  },
  {
    id: '14',
    applicantName: 'Rana Khoury',
    location: 'Zahle, Lebanon',
    familyMembersCount: 5,
    assistanceTypeId: 'Food Assistance',
    status: 'rejected',
    createdAt: '2024-02-02T14:15:00Z'
  },
  {
    id: '15',
    applicantName: 'Tarek Malek',
    location: 'Baalbek, Lebanon',
    familyMembersCount: 7,
    assistanceTypeId: 'Shelter Support',
    status: 'approved',
    createdAt: '2024-02-01T10:50:00Z'
  }
];

const RequestList = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [loading, setLoading] = useState(false);

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