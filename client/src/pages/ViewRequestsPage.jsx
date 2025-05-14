import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Space, Button, Input, Select, Tooltip, Modal, Form, InputNumber, message, Descriptions } from 'antd';
import { SearchOutlined, FilterOutlined, HeartOutlined, DollarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const ViewRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDonationModalVisible, setIsDonationModalVisible] = useState(false);
    const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isFinancialSummaryVisible, setIsFinancialSummaryVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [donationForm] = Form.useForm();
    const [expenseForm] = Form.useForm();
    const [financialSummary, setFinancialSummary] = useState(null);
    const [expenseError, setExpenseError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
            if (error.response?.status === 401) {
                message.error('Please login to continue');
                navigate('/login');
            } else {
                message.error('Failed to fetch requests');
            }
        }
    };

    const fetchFinancialSummary = async (requestId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/requests/${requestId}/financial-summary`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setFinancialSummary(response.data);
        } catch (error) {
            console.error('Error fetching financial summary:', error);
            if (error.response?.status === 401) {
                message.error('Please login to continue');
                navigate('/login');
            } else {
                message.error('Failed to fetch financial summary');
            }
        }
    };

    const statusColors = {
        pending: 'gold',
        approved: 'green',
        rejected: 'red',
        completed: 'blue'
    };

    const handleDonate = (request) => {
        setSelectedRequest(request);
        setIsDonationModalVisible(true);
        donationForm.resetFields();
    };

    const handleAddExpense = (request) => {
        setSelectedRequest(request);
        setIsExpenseModalVisible(true);
        expenseForm.resetFields();
        setExpenseError(null);
    };

    const handleViewFinancialSummary = async (request) => {
        setSelectedRequest(request);
        await fetchFinancialSummary(request.id);
        setIsFinancialSummaryVisible(true);
    };

    const handleDonationSubmit = async (values) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/requests/${selectedRequest.id}/donations`,
                {
                    amount: values.amount,
                    requestId: selectedRequest.id,
                    status: 'completed'
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            message.success('Donation submitted successfully!');
            setIsDonationModalVisible(false);
            donationForm.resetFields();
            
            // Update the request in the list
            setRequests(prevRequests => 
                prevRequests.map(req => 
                    req.id === selectedRequest.id 
                        ? { ...req, donationAmount: response.data.request.donationAmount }
                        : req
                )
            );
        } catch (error) {
            console.error('Error submitting donation:', error);
            if (error.response?.status === 401) {
                message.error('Please login to continue');
                navigate('/login');
            } else {
                message.error('Failed to submit donation');
            }
        }
    };

    const handleExpenseSubmit = async (values) => {
        try {
            setExpenseError(null);
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/requests/${selectedRequest.id}/expenses`,
                {
                    amount: values.amount,
                    description: values.description,
                    requestId: selectedRequest.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            message.success('Expense added successfully!');
            setIsExpenseModalVisible(false);
            expenseForm.resetFields();
            
            // Refresh financial summary
            await fetchFinancialSummary(selectedRequest.id);
        } catch (error) {
            console.error('Error adding expense:', error);
            if (error.response?.status === 401) {
                message.error('Please login to continue');
                navigate('/login');
            } else if (error.response?.data?.message === 'Insufficient funds') {
                const { availableAmount, totalDonations, totalExpenses } = error.response.data;
                setExpenseError({
                    message: 'Insufficient Funds',
                    details: {
                        availableAmount: parseFloat(availableAmount).toFixed(2),
                        totalDonations: parseFloat(totalDonations).toFixed(2),
                        totalExpenses: parseFloat(totalExpenses).toFixed(2)
                    }
                });
            } else {
                setExpenseError({
                    message: error.response?.data?.message || 'Failed to add expense'
                });
            }
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.applicantName?.toLowerCase().includes(searchText.toLowerCase()) ||
            request.description?.toLowerCase().includes(searchText.toLowerCase());

        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            title: 'Applicant Name',
            dataIndex: 'applicantName',
            key: 'applicantName',
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
            title: 'Head of Family Status',
            dataIndex: 'headOfFamilyStatus',
            key: 'headOfFamilyStatus',
            render: (status) => (
                <span style={{ fontWeight: 'bold' }}>
                    {status}
                </span>
            ),
        },
        {
            title: 'Assistance Type',
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
                <Space style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    {/* <Button
                        type="primary"
                        icon={<HeartOutlined />}
                        onClick={() => handleDonate(record)}
                    >
                        Donate
                    </Button> */}
                    <Button
                        type="default"
                        icon={<DollarOutlined />}
                        onClick={() => handleAddExpense(record)}
                    >
                        Add Expense
                    </Button>
                    <Button
                        onClick={() => handleViewFinancialSummary(record)}
                    >
                        View Summary
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
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} requests`
                    }}
                />
            </Card>

            {/* Donation Modal */}
            <Modal
                title="Make a Donation"
                open={isDonationModalVisible}
                onCancel={() => {
                    setIsDonationModalVisible(false);
                    donationForm.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={donationForm}
                    layout="vertical"
                    onFinish={handleDonationSubmit}
                    preserve={false}
                >
                    <Form.Item
                        name="amount"
                        label="Donation Amount"
                        rules={[{ required: true, message: 'Please enter donation amount' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                            prefix="$"
                            placeholder="Enter amount"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit Donation
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Expense Modal */}
            <Modal
                title="Add Expense"
                open={isExpenseModalVisible}
                onCancel={() => {
                    setIsExpenseModalVisible(false);
                    expenseForm.resetFields();
                    setExpenseError(null);
                }}
                footer={null}
            >
                <Form
                    form={expenseForm}
                    layout="vertical"
                    onFinish={handleExpenseSubmit}
                    preserve={false}
                >
                    {expenseError && (
                        <div style={{ marginBottom: 16, padding: 12, backgroundColor: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 4 }}>
                            <p style={{ color: '#ff4d4f', marginBottom: 8 }}>{expenseError.message}</p>
                            {expenseError.details && (
                                <div style={{ fontSize: 14 }}>
                                    <p>Available Amount: ${expenseError.details.availableAmount}</p>
                                    <p>Total Donations: ${expenseError.details.totalDonations}</p>
                                    <p>Total Expenses: ${expenseError.details.totalExpenses}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <Form.Item
                        name="amount"
                        label="Expense Amount"
                        rules={[{ required: true, message: 'Please enter expense amount' }]}
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            min={1}
                            prefix="$"
                            placeholder="Enter amount"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please enter expense description' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Enter expense description" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Add Expense
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Financial Summary Modal */}
            <Modal
                title="Financial Summary"
                open={isFinancialSummaryVisible}
                onCancel={() => setIsFinancialSummaryVisible(false)}
                footer={null}
            >
                {financialSummary && (
                    <Descriptions bordered>
                        <Descriptions.Item label="Total Donations" span={3}>
                            ${parseFloat(financialSummary.totalDonations).toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Expenses" span={3}>
                            ${parseFloat(financialSummary.totalExpenses).toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Remaining Amount" span={3}>
                            ${parseFloat(financialSummary.remainingAmount).toFixed(2)}
                        </Descriptions.Item>
                    </Descriptions>
                )}
                {financialSummary?.expenses?.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                        <h4>Expense History</h4>
                        <Table
                            dataSource={financialSummary.expenses}
                            columns={[
                                {
                                    title: 'Date',
                                    dataIndex: 'expenseDate',
                                    key: 'expenseDate',
                                    render: (date) => new Date(date).toLocaleDateString()
                                },
                                {
                                    title: 'Amount',
                                    dataIndex: 'amount',
                                    key: 'amount',
                                    render: (amount) => `$${parseFloat(amount).toFixed(2)}`
                                },
                                {
                                    title: 'Description',
                                    dataIndex: 'description',
                                    key: 'description'
                                }
                            ]}
                            pagination={false}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewRequestsPage;
