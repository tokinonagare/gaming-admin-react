import React from 'react';
import { Form, Input, Select, Button, Upload, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const GameForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  return (
    <Card title="游戏信息">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
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
            <Select.Option value="卡牌">卡牌</Select.Option>
            <Select.Option value="竞速">竞速</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="游戏描述"
          name="description"
        >
          <Input.TextArea rows={4} placeholder="请输入游戏描述" />
        </Form.Item>

        <Form.Item
          label="版本号"
          name="version"
          rules={[{ required: true, message: '请输入版本号' }]}
        >
          <Input placeholder="例如：1.0.0" />
        </Form.Item>

        <Form.Item
          label="游戏图标"
          name="icon"
        >
          <Upload
            name="icon"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>上传图标</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="下载链接"
          name="downloadUrl"
        >
          <Input placeholder="请输入下载链接" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            保存
          </Button>
          <Button onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GameForm;