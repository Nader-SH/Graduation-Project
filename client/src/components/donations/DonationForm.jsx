import React from 'react';
import { Form, Input, Button, Card, message, InputNumber, Select, Switch, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const DonationForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/donations`,
        values
      );

      if (response.data.success) {
        message.success('Donation submitted successfully');
        navigate('/my-donations');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error submitting donation';
      message.error(errorMessage);
      console.error('Error:', error);
    }
  };

  return (
    <Card style={{ maxWidth: 800, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 32 }}>
        Make a Donation
      </Title>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          donationType: 'one-time',
          isAnonymous: false
        }}
      >
        <Form.Item
          name="amount"
          label="Donation Amount"
          rules={[
            { required: true, message: 'Please enter donation amount' },
            { type: 'number', min: 1, message: 'Amount must be greater than 0' }
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Enter donation amount"
            prefix="$"
            precision={2}
            min={1}
          />
        </Form.Item>

        <Form.Item
          name="donationType"
          label="Donation Type"
          rules={[{ required: true, message: 'Please select donation type' }]}
        >
          <Select>
            <Option value="one-time">One-time Donation</Option>
            <Option value="monthly">Monthly Donation</Option>
            <Option value="quarterly">Quarterly Donation</Option>
            <Option value="yearly">Yearly Donation</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true, message: 'Please select payment method' }]}
        >
          <Select>
            <Option value="credit_card">Credit Card</Option>
            <Option value="bank_transfer">Bank Transfer</Option>
            <Option value="cash">Cash</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Title level={4} style={{ marginTop: 24 }}>Donor Information</Title>

        <Form.Item
          name="donorName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="donorEmail"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="donorPhone"
          label="Phone Number"
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message (Optional)"
        >
          <TextArea 
            rows={4} 
            placeholder="Add a message with your donation"
          />
        </Form.Item>

        <Form.Item
          name="isAnonymous"
          label="Make this donation anonymous"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Submit Donation
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DonationForm; 