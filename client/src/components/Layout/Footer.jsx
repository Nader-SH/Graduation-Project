import React from 'react';
import { Layout } from 'antd';

const Footer = () => {
  return (
    <Layout.Footer className="text-center">
      Your App ©{new Date().getFullYear()} Created by Your Name
      
    </Layout.Footer>
  );
};

export default Footer; 