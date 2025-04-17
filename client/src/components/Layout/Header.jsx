import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Avatar, Dropdown } from 'antd';
import {
  MenuOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  GiftOutlined,
  LockOutlined
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoIcon from '../../assets/LogoImdad/icon.svg';
import './Header.css';
const { Header } = Layout;

const HeaderComponent = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    if (!isAuthenticated) {
      return [
        {
          key: '/login',
          label: 'Login',
          icon: <UserOutlined />,
          children: [
            {
              key: '/login',
              label: 'Sign In',
              onClick: () => navigate('/login')
            },
            {
              key: '/forgot-password',
              label: 'Forgot Password',
              icon: <LockOutlined />,
              onClick: () => navigate('/forgot-password')
            }
          ]
        },
        {
          key: '/register',
          label: 'Register',
          onClick: () => navigate('/register')
        }
      ];
    }

    // Base menu items for all authenticated users
    const menuItems = [
      {
        key: '/dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard'
      }
    ];

    // Add role/type specific menu items
    if (user?.role === 'admin') {
      menuItems.push(
        {
          key: '/admin/requests',
          icon: <FileTextOutlined />,
          label: 'Manage Requests'
        },
        {
          key: '/admin/users',
          icon: <UsergroupAddOutlined />,
          label: 'Manage Users'
        }
      );
    } else if (user?.type === 'donor') {
      menuItems.push(
        {
          key: '/my-donations',
          icon: <GiftOutlined />,
          label: 'My Donations'
        },
        {
          key: '/requests',
          icon: <FileTextOutlined />,
          label: 'View Requests'
        }
      );
    } else if (user?.type === 'recipient') {
      menuItems.push(
        {
          key: '/my-requests',
          icon: <FileTextOutlined />,
          label: 'My Requests'
        }
      );
    }

    // Add profile and logout items
    menuItems.push(
      {
        key: 'user',
        icon: <UserOutlined />,
        label: user?.firstName,
        children: [
          {
            key: '/profile',
            icon: <UserOutlined />,
            label: 'Profile'
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: handleLogout
          }
        ]
      }
    );

    return menuItems;
  };

  const handleMenuClick = (e) => {
    if (e.key === 'logout') {
      handleLogout();
    } else {
      navigate(e.key);
    }
  };

  // Mobile menu items with nested structure
  const getMobileMenuItems = () => {
    if (!isAuthenticated) {
      return [
        {
          key: 'auth',
          type: 'group',
          label: 'Authentication',
          children: [
            {
              key: '/login',
              icon: <UserOutlined />,
              label: 'Sign In'
            },
            {
              key: '/forgot-password',
              icon: <LockOutlined />,
              label: 'Forgot Password'
            },
            {
              key: '/register',
              label: 'Register'
            }
          ]
        }
      ];
    }
    return getMenuItems();
  };

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        justifyContent: 'space-between',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="logo-container" style={{ marginRight: '24px' }}>
          <img src={logoIcon} alt="Logo" style={{ height: '32px' }} />
        </Link>

        {!isMobile && isAuthenticated && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={user?.image}
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            />
            <span style={{ marginRight: '24px' }}>
              {user?.firstName} {user?.lastName}
            </span>
          </div>
        )}
      </div>

      {!isMobile && (
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          onClick={handleMenuClick}
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            border: 'none',
            backgroundColor: 'transparent'
          }}
        />
      )}

      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
        />
      )}

      <Drawer
        title={isAuthenticated ? `Welcome, ${user?.firstName}!` : 'Menu'}
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        {isAuthenticated && (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <Avatar
              src={user?.image}
              size={64}
              icon={<UserOutlined />}
            />
            <h3 style={{ margin: '8px 0' }}>{user?.firstName} {user?.lastName}</h3>
            <p style={{ color: '#666' }}>{user?.type}</p>
          </div>
        )}
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={getMobileMenuItems()}
          onClick={(e) => {
            handleMenuClick(e);
            setMobileMenuVisible(false);
          }}
        />
      </Drawer>
    </Header>
  );
};

export default HeaderComponent; 