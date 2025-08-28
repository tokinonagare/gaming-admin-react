import React from 'react';
import { Card, Alert } from 'antd';

const AppUserFallback: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="模块加载失败" 
        description="应用用户模块无法加载，显示本地备用版本"
        type="warning" 
        style={{ marginBottom: 24 }}
        closable
      />
      <Card title="应用用户管理 (本地版本)">
        <p>应用用户模块正在开发中...</p>
      </Card>
    </div>
  );
};

export default AppUserFallback;