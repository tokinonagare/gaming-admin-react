import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import UserManagement from '../pages/UserManagement';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <UserManagement />
    </ConfigProvider>
  );
};

export default App;