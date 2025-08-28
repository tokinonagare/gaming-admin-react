import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { Game } from '@shared/types';

const GameList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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
      title: '版本',
      dataIndex: 'version',
      key: 'version',
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
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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

  const data: Game[] = [
    {
      id: '1',
      name: '王者荣耀',
      type: 'MOBA',
      description: '5v5英雄竞技手游',
      status: 'active',
      version: '3.84.1.5',
      createdAt: '2020-10-01',
      updatedAt: '2024-01-15',
    },
    {
      id: '2',
      name: '和平精英',
      type: '射击',
      description: '100人生存竞技手游',
      status: 'active',
      version: '1.19.15',
      createdAt: '2019-05-08',
      updatedAt: '2024-01-10',
    },
    {
      id: '3',
      name: '英雄联盟手游',
      type: 'MOBA',
      description: '经典MOBA手游',
      status: 'inactive',
      version: '4.4.0.6582',
      createdAt: '2021-10-08',
      updatedAt: '2023-12-20',
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(() => {
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          添加游戏
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      
      <Modal
        title="添加游戏"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="游戏名称"
            name="name"
            rules={[{ required: true, message: '请输入游戏名称' }]}
          >
            <Input placeholder="请输入游戏名称" />
          </Form.Item>
          <Form.Item
            label="游戏类型"
            name="type"
            rules={[{ required: true, message: '请选择游戏类型' }]}
          >
            <Select placeholder="请选择游戏类型">
              <Select.Option value="MOBA">MOBA</Select.Option>
              <Select.Option value="射击">射击</Select.Option>
              <Select.Option value="RPG">RPG</Select.Option>
              <Select.Option value="策略">策略</Select.Option>
              <Select.Option value="休闲">休闲</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="游戏描述"
            name="description"
          >
            <Input.TextArea rows={3} placeholder="请输入游戏描述" />
          </Form.Item>
          <Form.Item
            label="版本号"
            name="version"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input placeholder="请输入版本号，如：1.0.0" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GameList;