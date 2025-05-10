import React, { useState, useEffect } from 'react';
import { Table, Card, Space, Button, Input, message, Alert, Modal } from 'antd';
import { SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const VolunteerApprovalPage = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    // Fetch pending volunteers
    const fetchVolunteers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/volunteers/pending`);
            if (response.data.success) {
                setVolunteers(response.data.data);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error fetching pending volunteers';
            setError(errorMessage);
            message.error(errorMessage);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const handleApprove = async (volunteerId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/volunteers/${volunteerId}/approve`);
            if (response.data.success) {
                message.success('Volunteer approved successfully');
                fetchVolunteers(); // Refresh the list
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error approving volunteer';
            message.error(errorMessage);
            console.error('Error:', error);
        }
    };

    const handleReject = async (volunteerId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/volunteers/${volunteerId}/reject`, {
                reason: rejectReason
            });
            if (response.data.success) {
                message.success('Volunteer rejected successfully');
                setRejectModalVisible(false);
                setRejectReason('');
                setSelectedVolunteer(null);
                fetchVolunteers(); // Refresh the list
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error rejecting volunteer';
            message.error(errorMessage);
            console.error('Error:', error);
        }
    };

    const showRejectModal = (volunteer) => {
        setSelectedVolunteer(volunteer);
        setRejectModalVisible(true);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'name',
            render: (_, record) => `${record.firstName} ${record.lastName}`,
            sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Registration Date',
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
                        icon={<CheckOutlined />}
                        onClick={() => handleApprove(record.id)}
                    >
                        Approve
                    </Button>
                    <Button
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => showRejectModal(record)}
                    >
                        Reject
                    </Button>
                </Space>
            ),
        },
    ];

    const filteredVolunteers = volunteers.filter(volunteer => {
        const fullName = `${volunteer.firstName} ${volunteer.lastName}`.toLowerCase();
        const email = volunteer.email.toLowerCase();
        const searchLower = searchText.toLowerCase();
        return fullName.includes(searchLower) || email.includes(searchLower);
    });

    return (
        <div style={{ padding: '24px' }}>
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: '16px' }}
                />
            )}
            <Card 
                title="Pending Volunteer Approvals" 
                style={{ marginTop: '16px' }}
            >
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search by name or email..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: 300 }}
                    />
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredVolunteers}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} pending volunteers`
                    }}
                />
            </Card>

            <Modal
                title="Reject Volunteer"
                open={rejectModalVisible}
                onOk={() => handleReject(selectedVolunteer?.id)}
                onCancel={() => {
                    setRejectModalVisible(false);
                    setRejectReason('');
                    setSelectedVolunteer(null);
                }}
                okText="Reject"
                okButtonProps={{ danger: true }}
            >
                <p>Are you sure you want to reject {selectedVolunteer?.firstName} {selectedVolunteer?.lastName}?</p>
                <Input.TextArea
                    placeholder="Enter reason for rejection (optional)"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                />
            </Modal>
        </div>
    );
};

export default VolunteerApprovalPage; 