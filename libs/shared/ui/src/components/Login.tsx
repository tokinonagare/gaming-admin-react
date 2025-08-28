import React, { useState } from 'react';
import { Button, Card, Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      
      // 调用生产环境API登录接口
      const response = await fetch('https://admin.laiwan.io/admin/staff/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'app-id': 'laiwan',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('Login API Response:', data);
      
      if (data.ok && data.result) {
        console.log('Token found:', data.result.access_token);
        
        // 使用AuthContext的login方法
        login({
          token: data.result.access_token,
          username: data.result.username,
          userId: data.result.user_id,
          permissions: [data.result.user_group] // 使用 user_group 作为权限
        });
        
        message.success('登录成功');
        
        // 跳转回主页面
        window.location.href = '/';
      } else {
        console.log('Login failed, response:', data);
        throw new Error(data.message || '登录失败');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      message.error(error?.message || '登录失败，请检查用户名和密码');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f2f5'
    }}>
      <Card title="管理员登录" style={{ width: 400 }}>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: '100%' }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;