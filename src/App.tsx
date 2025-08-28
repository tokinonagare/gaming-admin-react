import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Dashboard from './pages/Dashboard';
import GameManagement from './pages/GameManagement';
import UserManagement from './pages/UserManagement';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/games" element={<GameManagement />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
};

export default App;