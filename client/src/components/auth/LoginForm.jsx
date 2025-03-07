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
      setError(null); // Clear any previous errors

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        { 
          email: values.email, 
          password: values.password 
        }
      );

      login(response.data.user);
      message.success('Login successful');
      navigate('/dashboard');
      
    } catch (error) {
      let errorMessage = 'Login failed';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Invalid credentials';
            break;
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 404:
            errorMessage = 'User not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = error.response.data.message || 'Login failed';
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response from server. Please check your internet connection';
      } else {
        // Something happened in setting up the request
        errorMessage = 'Error setting up request';
      }

      setError(errorMessage);
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
    <Card title="Login" style={{ maxWidth: 400, margin: '40px auto' }}>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </>
  );
};

export default LoginForm; 