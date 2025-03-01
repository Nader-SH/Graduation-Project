import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', values);
            
            // Use the updated login function with both user data and token
            login(response.data.user, response.data.token);
            message.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            message.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
                    Login
                </h2>
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
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
                        rules={[{ required: true, message: 'Please input your password!' }]}
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
                            Login
                        </Button>
                    </Form.Item>

                    <div className="text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 hover:text-blue-800">
                            Register now!
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default Login; 