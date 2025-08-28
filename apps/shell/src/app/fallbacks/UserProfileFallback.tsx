import React from 'react';
import { Card, Alert } from 'antd';

const UserProfileFallback: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="用户档案模块无法加载，显示本地备用版本"
        type="warning" 
        style={{ marginBottom: 24 }}
        closable
      />
      <Card title="用户档案管理 (本地版本)">
        <p>用户档案模块正在开发中...</p>
      </Card>
    </div>
  );
};

export default UserProfileFallback;