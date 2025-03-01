import React from 'react';
import { Card, Typography } from 'antd';
import { useAuth } from '../context/AuthContext';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <Title level={2}>Welcome to Dashboard</Title>
      
      <Card className="mt-4">
        <Title level={4}>User Information</Title>
        <div className="space-y-2">
          <Text strong>Name: </Text>
          <Text>{user?.firstName} {user?.lastName}</Text>
          <br />
          <Text strong>Email: </Text>
          <Text>{user?.email}</Text>
          <br />
          <Text strong>Type: </Text>
          <Text>{user?.type}</Text>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage; 