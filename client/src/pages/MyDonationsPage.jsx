import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Button, Input, Select, message, Row, Col, Statistic } from 'antd';
import { SearchOutlined, FilterOutlined, DollarOutlined, HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const MyDonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [stats, setStats] = useState({
        totalAmount: 0,
        totalDonations: 0,
        pendingDonations: 0,
        completedDonations: 0
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    const statusColors = {
        pending: 'gold',
        approved: 'green',
        completed: 'blue',
        cancelled: 'red'
    };

    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/donations/my-donations`);
            if (response.data.success) {
                setDonations(response.data.data);
                calculateStats(response.data.data);
            }
        } catch (error) {
            message.error('Failed to fetch donations');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (donationData) => {
        const stats = donationData.reduce((acc, donation) => {
            acc.totalAmount += donation.amount;
            acc.totalDonations += 1;
            if (donation.status === 'pending') acc.pendingDonations += 1;
            if (donation.status === 'completed') acc.completedDonations += 1;
            return acc;
        }, {
            totalAmount: 0,
            totalDonations: 0,
            pendingDonations: 0,
            completedDonations: 0
        });
        setStats(stats);
    };

    const handleCancelDonation = async (donationId) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/donations/${donationId}/cancel`);
            if (response.data.success) {
                message.success('Donation cancelled successfully');
                fetchDonations();
            }
        } catch (error) {
            message.error('Failed to cancel donation');
        }
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
                    loading={loading}
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
