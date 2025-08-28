import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BarChartOutlined,
  AccountBookOutlined,
  ProfileOutlined,
  SettingOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/user-report',
      icon: <BarChartOutlined />,
      label: '用户报告',
    },
    {
      key: '/user-transaction',
      icon: <AccountBookOutlined />,
      label: '用户交易',
    },
    {
      key: '/user-profile',
      icon: <ProfileOutlined />,
      label: '用户档案',
    },
    {
      key: '/app-user',
      icon: <SettingOutlined />,
      label: '应用用户',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider 
      width={200} 
      style={{ 
        position: 'fixed',
        left: 0,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: 40,
            width: 40,
            background: '#1890ff',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 6,
          }}
        >
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>G</span>
        </div>
        <span style={{ color: '#fff', fontSize: 17 }}>Gaming Admin</span>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default Sidebar;