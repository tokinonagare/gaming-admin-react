import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AvatarManagementPage from '../pages/AvatarManagementPage';

const UserAvatar: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AvatarManagementPage />} />
      <Route path="/avatar" element={<AvatarManagementPage />} />
    </Routes>
  );
};

export default UserAvatar;