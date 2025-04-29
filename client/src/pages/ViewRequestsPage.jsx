import React, { useState } from 'react';
import { Table, Card, Tag, Space, Button, Input, Select, Tooltip } from 'antd';
import { SearchOutlined, FilterOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

// Mock data for requests
const mockRequests = [
  {
    _id: '1',
    title: 'Medical Treatment for Child',
    description: 'Urgent medical treatment needed for a 5-year-old child with chronic illness',
    amountNeeded: 5000,
    assistanceType: 'medical',
    status: 'pending',
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    _id: '2',
    title: 'School Supplies for Orphanage',
    description: 'Basic school supplies needed for 30 children in local orphanage',
    amountNeeded: 1500,
    assistanceType: 'educational',
    status: 'approved',
    createdAt: '2024-02-14T15:30:00Z'
  },
  {
    _id: '3',
    title: 'Emergency Food Supplies',
    description: 'Food packages for 10 families affected by recent floods',
    amountNeeded: 2000,
    assistanceType: 'other',
    status: 'completed',
    createdAt: '2024-02-13T09:15:00Z'
  },
  {
    _id: '4',
    title: 'Rent Assistance',
    description: 'Help needed for family facing eviction due to job loss',
    amountNeeded: 3000,
    assistanceType: 'financial',
    status: 'approved',
    createdAt: '2024-02-12T14:20:00Z'
  },
  {
    _id: '5',
    title: 'Medical Equipment',
    description: 'Wheelchair and medical supplies for elderly patient',
    amountNeeded: 2500,
    assistanceType: 'medical',
    status: 'rejected',
    createdAt: '2024-02-11T11:45:00Z'
  },
  {
    _id: '6',
    title: 'Educational Support',
    description: 'Tuition fees for university student from low-income family',
    amountNeeded: 4000,
    assistanceType: 'educational',
    status: 'pending',
    createdAt: '2024-02-10T16:30:00Z'
  },
  {
    _id: '7',
    title: 'Home Repair',
    description: 'Emergency repairs needed for family home after storm damage',
    amountNeeded: 3500,
    assistanceType: 'other',
    status: 'approved',
    createdAt: '2024-02-09T13:10:00Z'
  },
  {
    _id: '8',
    title: 'Small Business Support',
    description: 'Startup capital for single mother starting small business',
    amountNeeded: 6000,
    assistanceType: 'financial',
    status: 'pending',
    createdAt: '2024-02-08T10:25:00Z'
  },
  {
    _id: '9',
    title: 'Emergency Shelter',
    description: 'Temporary housing for family displaced by fire',
    amountNeeded: 4500,
    assistanceType: 'other',
    status: 'approved',
    createdAt: '2024-02-07T08:15:00Z'
  },
  {
    _id: '10',
    title: 'Medical Supplies',
    description: 'Essential medications for community health center',
    amountNeeded: 2800,
    assistanceType: 'medical',
    status: 'completed',
    createdAt: '2024-02-06T14:40:00Z'
  },
  {
    _id: '11',
    title: 'Scholarship Fund',
    description: 'Support for underprivileged students in STEM fields',
    amountNeeded: 7500,
    assistanceType: 'educational',
    status: 'approved',
    createdAt: '2024-02-05T11:20:00Z'
  },
  {
    _id: '12',
    title: 'Debt Relief',
    description: 'Help with medical debt for cancer patient',
    amountNeeded: 12000,
    assistanceType: 'financial',
    status: 'pending',
    createdAt: '2024-02-04T09:30:00Z'
  },
  {
    _id: '13',
    title: 'Community Kitchen',
    description: 'Equipment and supplies for free community meals program',
    amountNeeded: 3200,
    assistanceType: 'other',
    status: 'rejected',
    createdAt: '2024-02-03T16:45:00Z'
  },
  {
    _id: '14',
    title: 'Special Education',
    description: 'Resources for children with special needs',
    amountNeeded: 5500,
    assistanceType: 'educational',
    status: 'approved',
    createdAt: '2024-02-02T13:15:00Z'
  },
  {
    _id: '15',
    title: 'Emergency Surgery',
    description: 'Life-saving surgery for uninsured patient',
    amountNeeded: 15000,
    assistanceType: 'medical',
    status: 'completed',
    createdAt: '2024-02-01T10:50:00Z'
  }
];

const ViewRequestsPage = () => {
    const [requests, setRequests] = useState(mockRequests);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const navigate = useNavigate();

    const statusColors = {
        pending: 'gold',
        approved: 'green',
        rejected: 'red',
        completed: 'blue'
    };

    const handleDonate = (requestId) => {
        navigate(`/donate/${requestId}`);
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
