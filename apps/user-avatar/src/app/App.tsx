import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainPage from '../pages/MainPage';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <MainPage />
    </ConfigProvider>
  );
};

export default App;