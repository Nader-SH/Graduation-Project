import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer, Space } from 'antd';
import { MenuOutlined, HeartOutlined, UserOutlined, FormOutlined, LoginOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoIcon from '../../assets/LogoImdad/icon.svg';
import { useUser } from '../../context/UserContext';
import './Header.css';

const { Header } = Layout;

const HeaderComponent = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMenuItems = () => {
    return [
      {
        key: '/',
        label: 'Home',
        icon: <MenuOutlined />
      },
      {
        key: 'requests',
        label: 'Requests',
        icon: <FormOutlined />,
        children: [
          {
            key: '/requests/new',
            label: 'Request Help'
          },
          {
            key: '/requests',
            label: 'View Requests'
          }
        ]
      },
      {
        key: 'donations',
        label: 'Donations',
        icon: <HeartOutlined />,
        children: [
          {
            key: '/make-donation',
            label: 'Make Donation'
          },
          {
            key: '/my-donations',
            label: 'My Donations'
          }
        ]
      },
      {
        key: '/profile',
        label: 'Profile',
        icon: <UserOutlined />
      },
      {
        key: '/admin/requests',
        label: 'Admin Requests'
      },
      {
        key: '/admin/volunteers',
        label: 'Volunteer Approvals'
      }
    ];
  };

  const handleMenuClick = (e) => {
    if (e.key.startsWith('/')) {
      navigate(e.key);
      setMobileMenuVisible(false);
    }
  };

  const getMobileMenuItems = () => {
    return getMenuItems().map(item => {
      if (item.children) {
        return {
          key: item.key,
          label: item.label,
          icon: item.icon,
          children: item.children.map(child => ({
            key: child.key,
            label: child.label,
            style: { paddingLeft: '24px' }
          }))
        };
      }
      return item;
    });
  };

  const handleLogin = () => {
    navigate('/login');
    setMobileMenuVisible(false);
  };

  const handleRegister = () => {
    navigate('/register');
    setMobileMenuVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuVisible(false);
  };

  const authButtons = user ? (
    <Button 
      type="primary" 
      icon={<LogoutOutlined />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  ) : (
    <Space>
      <Button 
        type="primary" 
        icon={<LoginOutlined />}
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button 
        icon={<UserAddOutlined />}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Space>
  );

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
      </div>

      {!isMobile && (
        <>
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
          {authButtons}
        </>
      )}

      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
        />
      )}

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMobileMenuItems()}
          onClick={handleMenuClick}
          style={{ borderRight: 'none' }}
        />
        <div style={{ padding: '16px' }}>
          {authButtons}
        </div>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent; 