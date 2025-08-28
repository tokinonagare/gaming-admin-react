import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import ApiHeaderFactory from '../api/ApiHeaderFactory';

const API_BASE_URL = process.env.REACT_APP_API_DOMAIN || 'https://admin.laiwan.io/admin/';

export interface ApiResponse<T = any> {
  ok: boolean;
  message: string;
  result: T;
}

// 通用API请求函数
const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`.replace(/([^:]\/)\/+/g, '$1');
  
  const response = await fetch(url, {
    headers: ApiHeaderFactory.headers(),
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

// GET请求的hook
export const useApiQuery = <T = any>(
  key: (string | number)[],
  endpoint: string,
  options?: Omit<UseQueryOptions<ApiResponse<T>>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: key,
    queryFn: () => apiRequest<T>(endpoint),
    ...options,
  });
};

// POST/PUT/DELETE请求的hook
export const useApiMutation = <TData = any, TVariables = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options?: Omit<UseMutationOptions<ApiResponse<TData>, Error, TVariables>, 'mutationFn'>
) => {
  return useMutation({
    mutationFn: (variables: TVariables) =>
      apiRequest<TData>(endpoint, {
        method,
        body: JSON.stringify(variables),
      }),
    ...options,
  });
};

// 专门用于列表查询的hook
export const useApiList = <T = any>(
  key: string,
  endpoint: string,
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<ApiResponse<T[]>>, 'queryKey' | 'queryFn'>
) => {
  const queryParams = params ? new URLSearchParams(params).toString() : '';
  const fullEndpoint = queryParams ? `${endpoint}?${queryParams}` : endpoint;
  
  return useApiQuery<T[]>([key, params], fullEndpoint, options);
};