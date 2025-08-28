import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import 'antd/dist/reset.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);