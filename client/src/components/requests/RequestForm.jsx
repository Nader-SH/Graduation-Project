import React from 'react';
import { Form, Input, Button, Card, message, Select, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select;

const RequestForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const requestData = {
        ...values,
        userId: user?.id
      };

      console.log(user); // Check if user is populated

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/requests`,
        requestData
      );
      message.success('Request submitted successfully');
      navigate('/request-success');
      
    } catch (error) {
      // Better error handling with axios
      const errorMessage = error.response?.data?.message || 'Error submitting request';
      message.error(errorMessage);
      console.error('Error:', error);
    }
  };

  return (
    <Card title="Submit Assistance Request" style={{ maxWidth: 600, margin: '40px auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="applicantName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your full name' }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="nationalId"
          label="National ID"
          rules={[{ required: true, message: 'Please enter your National ID' }]}
        >
          <Input placeholder="Enter your National ID" />
        </Form.Item>

        <Form.Item
          name="familyMembersCount"
          label="Number of Family Members"
          rules={[{ required: true, message: 'Please enter number of family members' }]}
        >
          <InputNumber 
            min={1} 
            placeholder="Enter number of family members"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="headOfFamilyStatus"
          label="Head of Family Status"
          rules={[{ required: true, message: 'Please select status' }]}
        >
          <Select placeholder="Select status">
            <Option value="employed">Employed</Option>
            <Option value="unemployed">Unemployed</Option>
            <Option value="retired">Retired</Option>
            <Option value="disabled">Disabled</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[{ required: true, message: 'Please enter your location' }]}
        >
          <Input placeholder="Enter your location" />
        </Form.Item>

        <Form.Item
          name="assistanceType"
          label="Type of Assistance Needed"
          rules={[{ required: true, message: 'Please select assistance type' }]}
        >
          <Select placeholder="Select assistance type">
            <Option value="Food">Food</Option>
            <Option value="Medical">Medical</Option>
            <Option value="Educational">Educational</Option>
            <Option value="Financial">Financial</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Additional Details"
          rules={[{ required: true, message: 'Please provide additional details' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Please provide any additional details about your request"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RequestForm; 