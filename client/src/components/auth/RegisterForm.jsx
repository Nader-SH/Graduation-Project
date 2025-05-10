import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const { Option } = Select;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      setError(null);

      // Remove confirmPassword as it's not needed in the API request
      const { confirmPassword, ...registrationData } = values;

      // Updated to match your backend API endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        registrationData
      );

      if (response.data.success) {
        message.success(response.data.message || 'Registration successful. Please login to continue.');
        // Navigate to login page after successful registration
        navigate('/login');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }

    } catch (error) {
      let errorMessage = '';

      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || 'Invalid input data';
            break;
          case 409:
            errorMessage = error.response.data.message || 'Email already exists';
            break;
          case 422:
            errorMessage = error.response.data.message || 'Validation error';
            break;
          case 429:
            errorMessage = 'Too many attempts. Please try again later';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later';
            break;
          default:
            errorMessage = error.response.data.message || 'Registration failed';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection';
      } else {
        errorMessage = error.message || 'Error processing registration';
      }

      setError(errorMessage);
      message.error(errorMessage);
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
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
        title="Register"
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
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: 'Please enter your first name' },
              { max: 50, message: 'First name must be less than 50 characters' },
              { pattern: /^[a-zA-Z\s]*$/, message: 'First name can only contain letters' }
            ]}
          >
            <Input
              placeholder="Enter your first name"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              { required: true, message: 'Please enter your last name' },
              { max: 50, message: 'Last name must be less than 50 characters' },
              { pattern: /^[a-zA-Z\s]*$/, message: 'Last name can only contain letters' }
            ]}
          >
            <Input
              placeholder="Enter your last name"
              size="large"
            />
          </Form.Item>

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
              { max: 50, message: 'Password must be less than 50 characters' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
              }
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="type"
            label="User Type"
            rules={[{ required: true, message: 'Please select your user type' }]}
          >
            <Select
              placeholder="Select your user type"
              size="large"
            >
              <Option value="volunteer">Volunteer</Option>
              <Option value="admin">Admin</Option>
            </Select>
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
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            Already have an account? <a href="/login">Login now</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterForm; 