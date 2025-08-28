import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@shared/ui';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';

// 动态导入远程模块
const Dashboard = React.lazy(() => 
  import('gaming-admin/Dashboard').catch(() => 
    import('./fallbacks/DashboardFallback')
  )
);

const GameManagement = React.lazy(() => 
  import('game-management/GameList').catch(() => 
    import('./fallbacks/GameManagementFallback')
  )
);

const UserManagement = React.lazy(() => 
  import('user-management/UserList').catch(() => 
    import('./fallbacks/UserManagementFallback')
  )
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<Spin size=\"large\" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />}>
          <Routes>
            <Route path=\"/\" element={<Dashboard />} />
            <Route path=\"/games\" element={<GameManagement />} />
            <Route path=\"/users\" element={<UserManagement />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;