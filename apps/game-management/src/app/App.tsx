import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import GameManagement from '../pages/GameManagement';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <GameManagement />
    </ConfigProvider>
  );
};

export default App;