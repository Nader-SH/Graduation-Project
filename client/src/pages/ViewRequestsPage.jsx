import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Button, Input, Select, message, Tooltip } from 'antd';
import { SearchOutlined, FilterOutlined, HeartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const ViewRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { user } = useAuth();
    const navigate = useNavigate();

    const statusColors = {
        pending: 'gold',
        approved: 'green',
        rejected: 'red',
        completed: 'blue'
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests`);
            if (response.data.success) {
                setRequests(response.data.data);
            }
        } catch (error) {
            message.error('Failed to fetch requests');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/requests/${requestId}/status`, {
                status: newStatus
            });
            if (response.data.success) {
                message.success('Request status updated successfully');
                fetchRequests(); // Refresh the table
            }
        } catch (error) {
            message.error('Failed to update request status');
        }
    };

    const handleDonate = async (requestId) => {
        try {
            navigate(`/donate/${requestId}`);
        } catch (error) {
            message.error('Failed to process donation');
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            request.description?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: {
                showTitle: false,
            },
            render: (description) => (
                <Tooltip placement="topLeft" title={description}>
                    {description}
                </Tooltip>
            ),
        },
        {
            title: 'Amount Needed',
            dataIndex: 'amountNeeded',
            key: 'amountNeeded',
            render: (amount) => `$${amount.toFixed(2)}`,
            sorter: (a, b) => a.amountNeeded - b.amountNeeded,
        },
        {
            title: 'Type',
            dataIndex: 'assistanceType',
            key: 'assistanceType',
            filters: [
                { text: 'Financial', value: 'financial' },
                { text: 'Medical', value: 'medical' },
                { text: 'Educational', value: 'educational' },
                { text: 'Other', value: 'other' },
            ],
            onFilter: (value, record) => record.assistanceType === value,
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
            title: 'Created At',
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
                        icon={<HeartOutlined />}
                        onClick={() => handleDonate(record._id)}
                        disabled={record.status !== 'approved'}
                    >
                        Donate
                    </Button>
                    <Button
                        type="link"
                        onClick={() => navigate(`/requests/${record._id}`)}
                    >
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card title="View Requests">
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search requests..."
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
                        <Option value="rejected">Rejected</Option>
                        <Option value="completed">Completed</Option>
                    </Select>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredRequests}
                    loading={loading}
                    rowKey="_id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} requests`
                    }}
                />
            </Card>
        </div>
    );
};

export default ViewRequestsPage;
