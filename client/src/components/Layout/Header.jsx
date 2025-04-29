import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoIcon from '../../assets/LogoImdad/icon.svg';
import './Header.css';

const { Header } = Layout;

const HeaderComponent = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      key: '/',
      label: 'Home'
    },
    {
      key: '/login',
      label: 'Login'
    },
    {
      key: '/register',
      label: 'Register'
    },
    {
      key: '/requests/new',
      label: 'Request Help'
    },
    {
      key: '/dashboard',
      label: 'Dashboard'
    },
    {
      key: '/profile',
      label: 'Profile'
    },
    {
      key: '/requests',
      label: 'View Requests'
    },
    {
      key: '/my-donations',
      label: 'My Donations'
    },
    {
      key: '/admin/requests',
      label: 'Admin Requests'
    }
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
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
      </div>

      {!isMobile && (
        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
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
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
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