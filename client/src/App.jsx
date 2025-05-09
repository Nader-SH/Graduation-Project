/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import HeaderComponent from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import RequestForm from './components/requests/RequestForm';
import RequestList from './components/requests/RequestList';
import RequestSuccess from './components/requests/RequestSuccess';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import ViewRequestsPage from './pages/ViewRequestsPage';
import MyDonationsPage from './pages/MyDonationsPage';
import DonationForm from './components/donations/DonationForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

const { Content } = Layout;

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  return children;
};

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <HeaderComponent />
            <Content
              style={{
                padding: isMobile ? '0' : '0 50px',
                marginTop: 15,
                minHeight: 'calc(100vh - 64px)'
              }}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/requests/new" element={<RequestForm />} />
                <Route path="/request-success" element={<RequestSuccess />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/requests" element={
                  <ProtectedRoute>
                    <ViewRequestsPage />
                  </ProtectedRoute>
                } />
                <Route path="/my-donations" element={
                  <ProtectedRoute>
                    <MyDonationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/make-donation" element={
                  <ProtectedRoute>
                    <DonationForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/requests" element={
                  <ProtectedRoute>
                    <RequestList />
                  </ProtectedRoute>
                } />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Content>
            <Footer />
          </Layout>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
};

export default App;
