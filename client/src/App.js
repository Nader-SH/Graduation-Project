import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Spin } from 'antd';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const { Content } = Layout;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout className="min-h-screen">
          <Header />
          <Content className="p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <Routes>
                {/* Public Routes */}
                {/* <Route path="/" element={<LandingPage />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  } 
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Content>
        </Layout>
          <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
