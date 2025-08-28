import React from 'react';
import { Layout, Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '个人设置',
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '2',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <h2 style={{ margin: 0 }}>游戏平台管理系统</h2>
      <Dropdown menu={{ items }} placement=\"bottomRight\">
        <Space style={{ cursor: 'pointer' }}>
          <Avatar icon={<UserOutlined />} />
          <span>管理员</span>
        </Space>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;