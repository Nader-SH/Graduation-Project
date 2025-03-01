import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, DashboardOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      // Clear localStorage first
      localStorage.clear();
      // Then call logout function
      logout();
      // Force reload and redirect
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Layout.Header className="bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold">
            Your Logo
          </Link>
          {user && (
            <Button 
              type="primary" 
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              className="flex items-center"
            >
              Logout
            </Button>
          )}
        </div>
        <Menu mode="horizontal" className="border-0">
          {user ? (
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="login" icon={<LoginOutlined />}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item key="register" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Layout.Header>
  );
};

export default Header; 