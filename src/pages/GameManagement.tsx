import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const GameManagement: React.FC = () => {
  const columns = [
    {
      title: '游戏名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status === 'active' ? '上线' : '下线'}
        </Tag>
      ),
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
      name: '王者荣耀',
      type: 'MOBA',
      status: 'active',
    },
    {
      key: '2',
      name: '和平精英',
      type: '射击',
      status: 'active',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>游戏管理</h1>
      <Button type="primary" style={{ marginBottom: 16 }}>
        添加游戏
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default GameManagement;