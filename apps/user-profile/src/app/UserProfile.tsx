import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserProfilePage from '../pages/UserProfilePage';

const UserProfile: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserProfilePage />} />
      <Route path="/profile" element={<UserProfilePage />} />
    </Routes>
  );
};

export default UserProfile;