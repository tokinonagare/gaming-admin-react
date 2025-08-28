// 工具函数
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('zh-CN');
};

export const formatCurrency = (amount: number): string => {
  if (amount == null || amount === undefined) {
    return '¥0';
  }
  return `¥${amount.toLocaleString('zh-CN')}`;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// API 相关
export { default as BaseApi } from './api/BaseApi';
export { default as ApiHeaderFactory } from './api/ApiHeaderFactory';

// 认证相关
export { default as AuthStorage } from './auth/AuthStorage';

// React Query hooks
export { useApiQuery, useApiMutation, useApiList } from './hooks/useApiRequest';
export type { ApiResponse } from './hooks/useApiRequest';

// 配置相关
export { default as AppConfig } from './constants/AppConfig';