// 实体类
export { default as BaseEntity } from './entities/BaseEntity';

// 用户相关类型
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

// 游戏相关类型
export interface Game {
  id: string;
  name: string;
  type: string;
  description: string;
  status: 'active' | 'inactive';
  version: string;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// UI相关类型
export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

// API相关类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}