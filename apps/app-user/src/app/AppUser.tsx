import React from 'react';
import { Card, Alert } from 'antd';

const AppUser: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Alert 
        message="应用用户模块" 
        description="应用用户管理功能正在开发中"
        type="info" 
        style={{ marginBottom: 24 }}
        closable
      />
      <Card title="应用用户管理">
        <p>这里将展示应用用户管理功能...</p>
        <p>包括用户列表、用户详情、用户管理等功能</p>
      </Card>
    </div>
  );
};

export default AppUser;