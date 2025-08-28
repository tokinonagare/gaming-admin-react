import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReportPage from '../pages/ReportPage';

const UserReport: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ReportPage />} />
      <Route path="/report" element={<ReportPage />} />
    </Routes>
  );
};

export default UserReport;