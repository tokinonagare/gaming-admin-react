import React from 'react';
import { Tabs } from 'antd';
import GameList from '../components/GameList';

const { TabPane } = Tabs;

const GameManagement: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>游戏管理</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="游戏列表" key="1">
          <GameList />
        </TabPane>
        <TabPane tab="游戏分类" key="2">
          <div>游戏分类管理功能开发中...</div>
        </TabPane>
        <TabPane tab="版本管理" key="3">
          <div>版本管理功能开发中...</div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default GameManagement;