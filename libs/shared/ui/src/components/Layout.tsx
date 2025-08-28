import React from 'react';
import { Layout as AntLayout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header';
import Sidebar from './Sidebar';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ConfigProvider locale={zhCN}>
      <AntLayout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <AntLayout style={{ marginLeft: 200 }}>
          <Header />
          <Content
            style={{
              margin: '20px 16px',
              padding: 24,
              minHeight: 280,
              background: '#fff',
              borderRadius: 6,
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </ConfigProvider>
  );
};

export default Layout;