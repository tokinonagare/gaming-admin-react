import React from 'react';
import { Tabs } from 'antd';
import AvatarList from '../components/AvatarList';
import AvatarUpload from '../components/AvatarUpload';

const { TabPane } = Tabs;

const UserAvatar: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>用户头像管理</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="头像列表" key="1">
          <AvatarList />
        </TabPane>
        <TabPane tab="头像上传" key="2">
          <AvatarUpload />
        </TabPane>
        <TabPane tab="审核管理" key="3">
          <div>头像审核功能开发中...</div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserAvatar;