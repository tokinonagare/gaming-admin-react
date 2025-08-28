import React, { useState } from 'react';
import { Upload, Button, Card, Form, Input, Select, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const AvatarUpload: React.FC = () => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('图片大小不能超过 5MB！');
        return false;
      }
      return false; // 阻止自动上传
    },
    onChange: (info) => {
      if (info.file.status === 'uploading') {
        setUploading(true);
      } else if (info.file.status === 'done') {
        setUploading(false);
        message.success('头像上传成功！');
      } else if (info.file.status === 'error') {
        setUploading(false);
        message.error('头像上传失败！');
      }
    },
  };

  const handleSubmit = async (values: any) => {
    console.log('Form values:', values);
    message.success('头像信息保存成功！');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <Card title="批量上传头像" style={{ marginBottom: 24 }}>
        <Upload.Dragger
          {...uploadProps}
          multiple={true}
          style={{ padding: '40px 20px' }}
        >
          <p className="ant-upload-drag-icon">
            <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">
            支持批量上传头像图片，支持 JPG、PNG、GIF 格式，单个文件不超过 5MB
          </p>
        </Upload.Dragger>
      </Card>

      <Card title="单个头像上传">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="用户ID"
            name="userId"
            rules={[{ required: true, message: '请输入用户ID' }]}
          >
            <Input placeholder="请输入用户ID" />
          </Form.Item>

          <Form.Item
            label="头像分类"
            name="category"
            rules={[{ required: true, message: '请选择头像分类' }]}
          >
            <Select placeholder="请选择头像分类">
              <Select.Option value="default">默认头像</Select.Option>
              <Select.Option value="custom">自定义头像</Select.Option>
              <Select.Option value="premium">高级头像</Select.Option>
              <Select.Option value="event">活动头像</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="头像文件"
            name="avatar"
            rules={[{ required: true, message: '请上传头像文件' }]}
          >
            <Upload
              {...uploadProps}
              listType="picture-card"
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>上传头像</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
          >
            <Input.TextArea 
              rows={3} 
              placeholder="请输入头像描述信息（可选）" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={uploading}
              style={{ marginRight: 8 }}
            >
              保存头像
            </Button>
            <Button onClick={() => form.resetFields()}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AvatarUpload;