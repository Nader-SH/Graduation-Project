import React, { useState } from 'react';
import { Card, Form, Input, Button, Upload, message, Avatar, Row, Col, Tabs } from 'antd';
import { UserOutlined, UploadOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const { TabPane } = Tabs;

const ProfilePage = () => {
    const { user, login } = useAuth();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(user?.image);

    // Handle profile update
    const handleProfileUpdate = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/users/profile`,
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    image: imageUrl
                }
            );

            if (response.data.success) {
                message.success('Profile updated successfully');
                login(response.data.data); // Update user context with new data
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/users/change-password`,
                {
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                }
            );

            if (response.data.success) {
                message.success('Password changed successfully');
                form.resetFields(['currentPassword', 'newPassword', 'confirmPassword']);
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    // Handle image upload
    const handleImageUpload = async (info) => {
        if (info.file.status === 'done') {
            setImageUrl(info.file.response.url);
            message.success('Image uploaded successfully');
        } else if (info.file.status === 'error') {
            message.error('Failed to upload image');
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} sm={24} md={20} lg={16} xl={14}>
                    <Card>
                        <div style={{ textAlign: 'center', marginBottom: 24 }}>
                            <Avatar
                                size={100}
                                src={imageUrl}
                                icon={<UserOutlined />}
                                style={{ marginBottom: 16 }}
                            />
                            <h2>{user?.firstName} {user?.lastName}</h2>
                            <p style={{ color: '#666' }}>{user?.type}</p>
                        </div>

                        <Tabs defaultActiveKey="profile">
                            <TabPane tab="Profile Information" key="profile">
                                <Form
                                    layout="vertical"
                                    initialValues={{
                                        firstName: user?.firstName,
                                        lastName: user?.lastName,
                                        email: user?.email
                                    }}
                                    onFinish={handleProfileUpdate}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="firstName"
                                                label="First Name"
                                                rules={[
                                                    { required: true, message: 'Please enter your first name' }
                                                ]}
                                            >
                                                <Input prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="lastName"
                                                label="Last Name"
                                                rules={[
                                                    { required: true, message: 'Please enter your last name' }
                                                ]}
                                            >
                                                <Input prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true, message: 'Please enter your email' },
                                            { type: 'email', message: 'Please enter a valid email' }
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined />} />
                                    </Form.Item>

                                    <Form.Item label="Profile Image">
                                        <Upload
                                            name="image"
                                            action={`${process.env.REACT_APP_API_URL}/upload`}
                                            onChange={handleImageUpload}
                                            showUploadList={false}
                                        >
                                            <Button icon={<UploadOutlined />}>Upload New Image</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} block>
                                            Update Profile
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="Change Password" key="password">
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={handlePasswordChange}
                                >
                                    <Form.Item
                                        name="currentPassword"
                                        label="Current Password"
                                        rules={[
                                            { required: true, message: 'Please enter your current password' }
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="newPassword"
                                        label="New Password"
                                        rules={[
                                            { required: true, message: 'Please enter your new password' },
                                            { min: 6, message: 'Password must be at least 6 characters' }
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm New Password"
                                        dependencies={['newPassword']}
                                        rules={[
                                            { required: true, message: 'Please confirm your new password' },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Passwords do not match'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading} block>
                                            Change Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage;
