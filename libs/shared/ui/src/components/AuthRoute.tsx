import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthStorage } from '@shared/utils';

interface AuthRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    requiredPermission?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ 
    children, 
    redirectTo = '/login',
    requiredPermission 
}) => {
    // 检查是否已登录
    if (!AuthStorage.isVerified()) {
        return <Navigate to={redirectTo} replace />;
    }

    // 检查权限（如果指定了权限要求）
    if (requiredPermission && !AuthStorage.hasPermission(requiredPermission)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default AuthRoute;