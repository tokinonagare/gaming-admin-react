import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  DashboardOutlined,
  GamepadOutlined,
  UserOutlined,
  SettingOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/user-report',
      icon: <DashboardOutlined />,
      label: '用户报告',
    },
    {
      key: '/user-transaction',
      icon: <GamepadOutlined />,
      label: '用户交易',
    },
    {
      key: '/user-profile',
      icon: <UserOutlined />,
      label: '用户档案',
    },
    {
      key: '/user-avatar',
      icon: <UserOutlined />,
      label: '用户头像',
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
    <Sider width={200} style={{ background: '#fff' }}>
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <h3 style={{ margin: 0, color: '#1890ff' }}>Gaming Admin</h3>
      </div>
      <Menu
        mode=\"inline\"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ height: 'calc(100% - 64px)', borderRight: 0 }}
      />
    </Sider>
  );
};

export default Sidebar;