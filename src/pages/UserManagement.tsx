import React from 'react';
import { Table, Button, Space, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

const UserManagement: React.FC = () => {
  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: () => <Avatar icon={<UserOutlined />} />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} size="small">
            编辑
          </Button>
          <Button icon={<DeleteOutlined />} size="small" danger>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      username: '张三',
      email: 'zhangsan@example.com',
      registerTime: '2023-01-15',
    },
    {
      key: '2',
      username: '李四',
      email: 'lisi@example.com',
      registerTime: '2023-02-20',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>用户管理</h1>
      <Button type="primary" style={{ marginBottom: 16 }}>
        添加用户
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UserManagement;