import React, { useState, useEffect } from 'react';
import { Table, Card, Space, Button, Input, Select, Row, Col, Statistic, message } from 'antd';
import { SearchOutlined, FilterOutlined, DollarOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const MyDonationsPage = () => {
    const [donations, setDonations] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [stats, setStats] = useState({
        totalAmount: 0,
        totalDonations: 0,
        pendingDonations: 0,
        completedDonations: 0
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch donations and summary data
    const fetchData = async () => {
        try {
            setLoading(true);
            // Fetch all donations
            const donationsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/donations`);
            if (donationsResponse.data.success) {
                setDonations(donationsResponse.data.data);
            }

            // Fetch summary
            const summaryResponse = await axios.get(`${process.env.REACT_APP_API_URL}/donations/summary`);
            if (summaryResponse.data.success) {
                setStats({
                    totalAmount: parseFloat(summaryResponse.data.data.totalAmount),
                    totalDonations: summaryResponse.data.data.totalDonations,
                    pendingDonations: 0, // These would need to be added to the backend if needed
                    completedDonations: 0
                });
            }
        } catch (error) {
            message.error('Error fetching donations data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCancelDonation = async (donationId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/donations/${donationId}`);
            if (response.data.success) {
                message.success('Donation cancelled successfully');
                fetchData(); // Refresh data
            }
        } catch (error) {
            message.error('Error cancelling donation');
            console.error('Error:', error);
        }
    };

    const columns = [
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount) => `$${parseFloat(amount).toFixed(2)}`,
            sorter: (a, b) => parseFloat(a.amount) - parseFloat(b.amount),
        },
        {
            title: 'Date',
            dataIndex: 'donationDate',
            key: 'donationDate',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.donationDate) - new Date(b.donationDate),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="danger"
                        onClick={() => handleCancelDonation(record.id)}
                    >
                        Cancel
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredDonations = donations.filter(donation => {
        const matchesSearch = donation.amount.toString().includes(searchText);
        return matchesSearch;
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
            </Row>

            <Card 
                title="My Donations" 
                style={{ marginTop: '16px' }}
                extra={
                    <Button type="primary" onClick={() => navigate('/make-donation')}>
                        Make New Donation
                    </Button>
                }
            >
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search by amount..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 200 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredDonations}
                    rowKey="id"
                    loading={loading}
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
