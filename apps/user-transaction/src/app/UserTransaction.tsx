import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TransactionPage from '../pages/TransactionPage';

const UserTransaction: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TransactionPage />} />
      <Route path="/transaction" element={<TransactionPage />} />
    </Routes>
  );
};

export default UserTransaction;