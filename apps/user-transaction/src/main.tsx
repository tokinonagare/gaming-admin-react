import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import UserTransaction from './app/UserTransaction';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <UserTransaction />
  </BrowserRouter>
);