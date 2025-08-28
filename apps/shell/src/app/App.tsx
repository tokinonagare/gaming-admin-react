import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@shared/ui';
import { Spin } from 'antd';
import ErrorBoundary from './components/ErrorBoundary';

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

const UserAvatar = React.lazy(() => 
  import('user-avatar/UserAvatar').catch(() => 
    import('./fallbacks/UserAvatarFallback')
  )
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<Spin size=\"large\" style={{ display: 'flex', justifyContent: 'center', marginTop: '20%' }} />}>
          <Routes>
            <Route path=\"/\" element={<UserReport />} />
            <Route path=\"/user-report\" element={<UserReport />} />
            <Route path=\"/user-transaction\" element={<UserTransaction />} />
            <Route path=\"/user-profile\" element={<UserProfile />} />
            <Route path=\"/app-user\" element={<AppUser />} />
            <Route path=\"/user-avatar\" element={<UserAvatar />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;