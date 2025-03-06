/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderComponent from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import RequestForm from './components/requests/RequestForm';
import RequestList from './components/admin/RequestList';
import RequestSuccess from './components/requests/RequestSuccess';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './context/AuthContext';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <HeaderComponent />
          <Content style={{ padding: '0 50px', marginTop: 64, minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/requests/new" element={<RequestForm />} />
              <Route path="/request-success" element={<RequestSuccess />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/admin/requests" element={<RequestList />} />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
