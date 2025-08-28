import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStorage } from '@shared/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // 如果是401错误，不重试，但不跳转
        if (error?.response?.status === 401 || error?.status === 401) {
          // 清除认证信息
          AuthStorage.clear();
          return false;
        }
        
        // 其他错误重试3次
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 10 * 60 * 1000, // 10分钟 (原 cacheTime)
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // 401错误不重试，但不跳转
        if (error?.response?.status === 401 || error?.status === 401) {
          AuthStorage.clear();
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export { queryClient };