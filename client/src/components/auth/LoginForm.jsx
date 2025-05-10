import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email: values.email,
          password: values.password
        }
      );

      if (response.data.success) {
        localStorage.setItem('token', response.data.data.token);

        const userData = response.data.data;

        login(userData);

        message.success('Login successful');
        navigate('/');
      } else {
        throw new Error(response.data.message || 'Login failed');
      }

    } catch (error) {
      let errorMessage = 'Login failed';

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Invalid input data';
            break;
          case 401:
            errorMessage = error.response.data.message || 'Invalid email or password';
            break;
          case 404:
            errorMessage = error.response.data.message || 'User not found';
            break;
          case 429:
            errorMessage = 'Too many login attempts. Please try again later';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = error.response.data.message || 'Login failed';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection';
      } else {
        errorMessage = error.message || 'Error processing login';
      }

      setError(errorMessage);
      message.error(errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16, maxWidth: 400, margin: '20px auto' }}
          closable
          onClose={() => setError(null)}
        />
      )}
      <Card
        title="Login"
        style={{
          maxWidth: 600,
          margin: '40px auto',
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
              { type: 'email', message: 'Please enter a valid email' },
              { max: 50, message: 'Email must be less than 50 characters' }
            ]}
          >
            <Input
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
              { max: 50, message: 'Password must be less than 50 characters' }
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}
              size="large"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <a href="/forgot-password">Forgot Password?</a>
            <div style={{ marginTop: 8 }}>
              Don't have an account? <a href="/register">Register now</a>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm; 