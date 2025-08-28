export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: string;
}

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

export interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}