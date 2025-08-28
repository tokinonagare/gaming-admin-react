import React from 'react';
import { Card, Form, Input, Button, Switch, Alert } from 'antd';

const SystemSettingsFallback: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="系统设置模块无法加载，显示本地备用版本"
        type="warning" 
        style={{ marginBottom: 24 }}
        closable
      />
      <h1>系统设置 (本地版本)</h1>
      <Card title="基础配置">
        <Form layout="vertical">
          <Form.Item label="系统名称">
            <Input defaultValue="游戏平台管理系统" />
          </Form.Item>
          <Form.Item label="启用维护模式">
            <Switch />
          </Form.Item>
          <Form.Item>
            <Button type="primary">保存设置</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SystemSettingsFallback;