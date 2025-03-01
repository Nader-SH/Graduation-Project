import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const formData = {
                ...values,
                type: 'user',
                image: 'default.jpg'
            };

            await axios.post('http://localhost:8000/api/users/register', formData);
            message.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            message.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    Register
                </h2>
                <Form
                    name="register"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="First Name" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input 
                            prefix={<UserOutlined />} 
                            placeholder="Last Name" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input 
                            prefix={<MailOutlined />} 
                            placeholder="Email" 
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder="Password" 
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="w-full"
                            loading={loading}
                        >
                            Register
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-800">
                            Login now!
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Register; 