import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthStorage } from '@shared/utils';

interface User {
  token: string;
  username: string;
  userId: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = AuthStorage.getToken();
      const username = AuthStorage.getUsername();
      const userId = AuthStorage.getUserId();
      const permissions = AuthStorage.getPermissions();

      if (token && username && userId) {
        setUser({
          token,
          username,
          userId,
          permissions,
        });
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    AuthStorage.setAuth(userData);
  };

  const logout = () => {
    setUser(null);
    AuthStorage.clear();
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};