import React, { useState } from 'react';
import { Table, Card, Tag, Space, Button, Input, Select, Row, Col, Statistic } from 'antd';
import { SearchOutlined, FilterOutlined, DollarOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// Mock data for donations
const mockDonations = [
  {
    _id: '1',
    requestId: '1',
    requestTitle: 'Medical Treatment for Child',
    amount: 500,
    status: 'completed',
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    _id: '2',
    requestId: '2',
    requestTitle: 'School Supplies for Orphanage',
    amount: 300,
    status: 'pending',
    createdAt: '2024-02-14T15:30:00Z'
  },
  {
    _id: '3',
    requestId: '3',
    requestTitle: 'Emergency Food Supplies',
    amount: 200,
    status: 'approved',
    createdAt: '2024-02-13T09:15:00Z'
  },
  {
    _id: '4',
    requestId: '4',
    requestTitle: 'Rent Assistance',
    amount: 1000,
    status: 'completed',
    createdAt: '2024-02-12T14:20:00Z'
  },
  {
    _id: '5',
    requestId: '5',
    requestTitle: 'Medical Equipment',
    amount: 750,
    status: 'cancelled',
    createdAt: '2024-02-11T11:45:00Z'
  },
  {
    _id: '6',
    requestId: '6',
    requestTitle: 'Educational Support',
    amount: 400,
    status: 'pending',
    createdAt: '2024-02-10T16:30:00Z'
  },
  {
    _id: '7',
    requestId: '7',
    requestTitle: 'Home Repair',
    amount: 1200,
    status: 'completed',
    createdAt: '2024-02-09T13:10:00Z'
  },
  {
    _id: '8',
    requestId: '8',
    requestTitle: 'Small Business Support',
    amount: 1500,
    status: 'approved',
    createdAt: '2024-02-08T10:25:00Z'
  },
  {
    _id: '9',
    requestId: '9',
    requestTitle: 'Emergency Shelter',
    amount: 800,
    status: 'completed',
    createdAt: '2024-02-07T08:15:00Z'
  },
  {
    _id: '10',
    requestId: '10',
    requestTitle: 'Medical Supplies',
    amount: 600,
    status: 'pending',
    createdAt: '2024-02-06T14:40:00Z'
  },
  {
    _id: '11',
    requestId: '11',
    requestTitle: 'Scholarship Fund',
    amount: 2500,
    status: 'approved',
    createdAt: '2024-02-05T09:20:00Z'
  },
  {
    _id: '12',
    requestId: '12',
    requestTitle: 'Community Kitchen',
    amount: 1800,
    status: 'completed',
    createdAt: '2024-02-04T16:45:00Z'
  },
  {
    _id: '13',
    requestId: '13',
    requestTitle: 'Special Education',
    amount: 900,
    status: 'pending',
    createdAt: '2024-02-03T11:30:00Z'
  },
  {
    _id: '14',
    requestId: '14',
    requestTitle: 'Emergency Surgery',
    amount: 3500,
    status: 'approved',
    createdAt: '2024-02-02T14:15:00Z'
  },
  {
    _id: '15',
    requestId: '15',
    requestTitle: 'Debt Relief',
    amount: 2000,
    status: 'completed',
    createdAt: '2024-02-01T10:50:00Z'
  },
  {
    _id: '16',
    requestId: '16',
    requestTitle: 'Youth Program',
    amount: 1200,
    status: 'cancelled',
    createdAt: '2024-01-31T13:25:00Z'
  },
  {
    _id: '17',
    requestId: '17',
    requestTitle: 'Elderly Care',
    amount: 1500,
    status: 'pending',
    createdAt: '2024-01-30T09:40:00Z'
  },
  {
    _id: '18',
    requestId: '18',
    requestTitle: 'Disaster Relief',
    amount: 3000,
    status: 'approved',
    createdAt: '2024-01-29T15:20:00Z'
  },
  {
    _id: '19',
    requestId: '19',
    requestTitle: 'Mental Health Support',
    amount: 800,
    status: 'completed',
    createdAt: '2024-01-28T11:15:00Z'
  },
  {
    _id: '20',
    requestId: '20',
    requestTitle: 'Clean Water Project',
    amount: 2200,
    status: 'approved',
    createdAt: '2024-01-27T14:30:00Z'
  }
];

const MyDonationsPage = () => {
    const [donations, setDonations] = useState(mockDonations);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [stats, setStats] = useState({
        totalAmount: 27550,
        totalDonations: 20,
        pendingDonations: 5,
        completedDonations: 7
    });
    const navigate = useNavigate();

    const statusColors = {
        pending: 'gold',
        approved: 'green',
        completed: 'blue',
        cancelled: 'red'
    };

    const handleCancelDonation = (donationId) => {
        setDonations(donations.map(donation => 
            donation._id === donationId 
                ? { ...donation, status: 'cancelled' }
                : donation
        ));
        // Update stats after cancellation
        const updatedStats = {
            totalAmount: stats.totalAmount,
            totalDonations: stats.totalDonations,
            pendingDonations: stats.pendingDonations - 1,
            completedDonations: stats.completedDonations
        };
        setStats(updatedStats);
    };

    const columns = [
        {
            title: 'Request Title',
            dataIndex: 'requestTitle',
            key: 'requestTitle',
            sorter: (a, b) => a.requestTitle.localeCompare(b.requestTitle),
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${amount.toFixed(2)}`,
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={statusColors[status]}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => navigate(`/requests/${record.requestId}`)}
                    >
                        View Request
                    </Button>
                    {record.status === 'pending' && (
                        <Button
                            type="danger"
                            onClick={() => handleCancelDonation(record._id)}
                        >
                            Cancel
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const filteredDonations = donations.filter(donation => {
        const matchesSearch =
            donation.requestTitle?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Donations"
                            value={stats.totalDonations}
                            prefix={<HeartOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Total Amount"
                            value={stats.totalAmount}
                            precision={2}
                            prefix={<DollarOutlined />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Pending Donations"
                            value={stats.pendingDonations}
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card>
                        <Statistic
                            title="Completed Donations"
                            value={stats.completedDonations}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="My Donations" style={{ marginTop: '16px' }}>
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search donations..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                    <Select
                        defaultValue="all"
                        style={{ width: 120 }}
                        onChange={value => setFilterStatus(value)}
                        prefix={<FilterOutlined />}
                    >
                        <Option value="all">All Status</Option>
                        <Option value="pending">Pending</Option>
                        <Option value="approved">Approved</Option>
                        <Option value="completed">Completed</Option>
                        <Option value="cancelled">Cancelled</Option>
                    </Select>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredDonations}
                    rowKey="_id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} donations`
                    }}
                />
            </Card>
        </div>
    );
};

export default MyDonationsPage;
