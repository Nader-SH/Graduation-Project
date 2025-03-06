import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const { Header } = Layout;

const HeaderComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    if (isAuthenticated) {
      return [
        {
          key: '/dashboard',
          label: 'Dashboard',
          onClick: () => navigate('/dashboard')
        },
        {
          key: '/admin/requests',
          label: 'Request List',
          onClick: () => navigate('/admin/requests')
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
        key: '/login',
        label: 'Login',
        onClick: () => navigate('/login')
      },
      {
        key: '/register',
        label: 'Register',
        onClick: () => navigate('/register')
      },
      {
        key: '/requests/new',
        label: 'New Request',
        onClick: () => navigate('/requests/new')
      },
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
        selectedKeys={[location.pathname]}
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