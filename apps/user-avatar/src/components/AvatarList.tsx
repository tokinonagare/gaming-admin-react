import React from 'react';
import { Table, Avatar, Button, Space, Tag, Image } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const AvatarList: React.FC = () => {
  const columns = [
    {
      title: '头像预览',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => (
        <Avatar 
          size={64} 
          src={avatar} 
          style={{ cursor: 'pointer' }}
        />
      ),
    },
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
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colorMap: Record<string, string> = {
          '已审核': 'green',
          '待审核': 'orange',
          '已拒绝': 'red',
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (record: any) => (
        <Space size="small">
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => {
              Image.preview({
                src: record.avatar,
              });
            }}
          >
            查看
          </Button>
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
      userId: 'U001',
      username: '张三',
      avatar: 'https://joeschmoe.io/api/v1/male/1',
      uploadTime: '2024-01-15 10:30',
      status: '已审核',
    },
    {
      key: '2', 
      userId: 'U002',
      username: '李四',
      avatar: 'https://joeschmoe.io/api/v1/female/2',
      uploadTime: '2024-01-14 15:20',
      status: '待审核',
    },
    {
      key: '3',
      userId: 'U003', 
      username: '王五',
      avatar: 'https://joeschmoe.io/api/v1/male/3',
      uploadTime: '2024-01-13 09:15',
      status: '已拒绝',
    },
  ];

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space>
          <Button type="primary">批量审核</Button>
          <Button>导出列表</Button>
        </Space>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{
          total: 100,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
      />
    </>
  );
};

export default AvatarList;