import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import UserAvatar from './app/UserAvatar';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <UserAvatar />
  </BrowserRouter>
);