import React from 'react';
import { Table, Card } from 'antd';

const UserList: React.FC = () => {
  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      userId: 'APP001',
      username: '应用用户1',
      status: '活跃',
    },
  ];

  return (
    <Card title="用户列表">
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default UserList;