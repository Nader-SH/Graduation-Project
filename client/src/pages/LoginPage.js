import React from 'react';
import { Form, Input, Button, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';  // Importing external CSS for the page
import loginImage from '../assets/login-help-image.jpeg';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Received values:', values);

        // After successful login, redirect to Dashboard
        navigate('/dashboard');
    };

    return (
        <Row gutter={16} align="middle" justify="center" style={{ height: '100vh' }}>
            {/* Form column */}
            <Col xs={24} sm={24} md={12} lg={10} style={{
                paddingLeft: "8px",
                height: "100%",
                paddingRight: "8px",
            }}>
                <div className="form-container">
                    <h1 className="login-title">Login</h1>
                    <Form
                        name="login-form"
                        onFinish={onFinish}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email address!' },
                            ]}
                        >
                            <Input type="email" placeholder="Enter your email" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <Form.Item>
                            <Space style={{ width: '100%', justifyContent: 'center' }}>
                                <Button type="primary" htmlType="submit" className="login-btn">
                                    Login
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Col>

            {/* Image column */}
            <Col xs={0} sm={0} md={12} lg={14}>
                <div className="image-container">
                    <img src={loginImage} alt="login background" className="login-image" />
                    <div className="image-overlay">
                        <h2>Welcome Back!</h2>
                        <p>Login to access your dashboard and manage your data.</p>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
