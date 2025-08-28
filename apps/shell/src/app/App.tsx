import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, AuthRoute } from '@shared/ui';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';
import Login from '../pages/Login';

// 动态导入远程模块
const UserReport = React.lazy(() => 
  import('user-report/UserReport').catch(() => 
    import('./fallbacks/UserReportFallback')
  )
);

const UserTransaction = React.lazy(() => 
  import('user-transaction/UserTransaction').catch(() => 
    import('./fallbacks/UserTransactionFallback')
  )
);

const UserProfile = React.lazy(() => 
  import('user-profile/UserProfile').catch(() => 
    import('./fallbacks/UserProfileFallback')
  )
);

const AppUser = React.lazy(() => 
  import('app-user/AppUser').catch(() => 
    import('./fallbacks/AppUserFallback')
  )
);


const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <AuthRoute>
            <Layout>
              <Suspense fallback={<Spin size="large" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />}>
                <Routes>
                  <Route path="/" element={<UserReport />} />
                  <Route path="/user-report" element={<UserReport />} />
                  <Route path="/user-transaction" element={<UserTransaction />} />
                  <Route path="/user-profile" element={<UserProfile />} />
                  <Route path="/app-user" element={<AppUser />} />
                </Routes>
              </Suspense>
            </Layout>
          </AuthRoute>
        } />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;