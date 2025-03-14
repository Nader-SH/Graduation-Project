import React, { useState, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
const { Content, Sider } = Layout;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: Array.from({ length: 4 }).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});

const DashboardPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setCollapsed(mobile);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout
            style={{
                borderRadius: borderRadiusLG,
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            {isMobile && (
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        position: 'fixed',
                        left: collapsed ? '20px' : '200px',
                        top: '127px',
                        zIndex: 1001,
                        background: colorBgContainer,
                        border: '1px solid #e8e8e8',
                        borderRadius: '4px',
                        transition: 'left 0.2s',
                    }}
                />
            )}
            <Sider
                width={200}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint="lg"
                style={{
                    background: colorBgContainer,
                    position: isMobile ? 'fixed' : 'relative',
                    height: '100vh',
                    left: collapsed && isMobile ? '-200px' : 0,
                    zIndex: 1000,
                    transition: 'left 0.2s',
                }}
                trigger={null}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                        height: '100%',
                        borderRight: 0,
                    }}
                    items={items2}
                />
            </Sider>
            <Layout
                style={{
                    padding: '0 24px 24px',
                    marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
                    transition: 'margin-left 0.2s',
                }}
            >
                <Breadcrumb
                    items={[
                        {
                            title: 'Home',
                        },
                        {
                            title: 'List',
                        },
                        {
                            title: 'App',
                        },
                    ]}
                    style={{
                        margin: '16px 0',
                    }}
                />
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <h2>Welcome to Your Dashboard!</h2>
                    <p>This is your personalized dashboard content.</p>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardPage;
