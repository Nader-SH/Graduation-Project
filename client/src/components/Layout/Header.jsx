import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoIcon from '../../assets/LogoImdad/icon.svg';
const { Header } = Layout;

const HeaderComponent = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isAuthenticated, logout } = useAuth();
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
          onClick: handleLogout
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
    <Header 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 20px',
        justifyContent: 'space-between'
      }}
    >
      <Link to="/" className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoIcon} 
          alt="Imdad Logo" 
          style={{ height: '32px', marginRight: '8px' }} 
        />
        <span style={{ 
          color: 'white', 
          fontSize: '20px',
          display: isMobile ? 'none' : 'inline'
        }}>
          Imdad
        </span>
      </Link>

      {!isMobile && (
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'flex-end'
          }}
        />
      )}

      {isMobile && (
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuVisible(true)}
          style={{
            color: 'white'
          }}
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
          theme="light"
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          onClick={() => setMobileMenuVisible(false)}
        />
      </Drawer>
    </Header>
  );
};

export default HeaderComponent; 