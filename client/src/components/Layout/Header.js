import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;

const HeaderComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const getMenuItems = () => {
    if (isAuthenticated) {
      return [
        {
          key: 'dashboard',
          label: 'Dashboard',
          onClick: () => navigate('/dashboard')
        },
        {
          key: 'newRequest',
          label: 'New Request',
          onClick: () => navigate('/requests/new')
        },
        {
          key: 'logout',
          label: 'Logout',
          onClick: logout
        }
      ];
    }
    return [
      {
        key: 'login',
        label: 'Login',
        onClick: () => navigate('/login')
      },
      {
        key: 'register',
        label: 'Register',
        onClick: () => navigate('/register')
      }
    ];
  };

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/" className="demo-logo" style={{ color: 'white', marginRight: '20px' }}>
        Assistance Portal
      </Link>
      <Menu
        theme="dark"
        mode="horizontal"
        items={getMenuItems()}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
    </Header>
  );
};

export default HeaderComponent; 