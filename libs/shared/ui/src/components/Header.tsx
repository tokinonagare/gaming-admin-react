import React from 'react';
import { Layout, Avatar, Dropdown, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AuthStorage } from '@shared/utils';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const username = AuthStorage.getUsername();

  const handleSignOut = () => {
    AuthStorage.clear();
    window.location.reload();
  };

  const items: MenuProps['items'] = [
    {
      key: 'signout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleSignOut,
    },
  ];

  return (
    <AntHeader
      style={{
        padding: '0 12px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 50,
      }}
    >
      <Dropdown menu={{ items }} placement="bottomCenter">
        <Button
          type="text"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar size="small" icon={<UserOutlined />} />
          <span style={{ marginLeft: 5 }}>{username || '管理员'}</span>
        </Button>
      </Dropdown>
    </AntHeader>
  );
};

export default Header;