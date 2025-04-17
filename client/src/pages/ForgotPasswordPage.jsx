import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailSent, setEmailSent] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
                { email: values.email }
            );

            if (response.data.success) {
                setEmailSent(true);
                message.success('Password reset instructions have been sent to your email');
                form.resetFields();
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to send reset instructions';
            setError(errorMessage);
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container" style={{ padding: '40px 20px' }}>
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ maxWidth: 400, margin: '0 auto 20px' }}
                    closable
                    onClose={() => setError(null)}
                />
            )}

            {emailSent && (
                <Alert
                    message="Check your email"
                    description="If an account exists with this email, you will receive password reset instructions."
                    type="success"
                    showIcon
                    style={{ maxWidth: 400, margin: '0 auto 20px' }}
                />
            )}

            <Card
                title="Forgot Password"
                style={{
                    maxWidth: 400,
                    margin: '0 auto',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            placeholder="Enter your email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            loading={loading}
                        >
                            Send Reset Instructions
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/login">Back to Login</Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default ForgotPasswordPage;
