import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

interface UnauthorizedErrorProps {
  message?: string;
}

const UnauthorizedError: React.FC<UnauthorizedErrorProps> = ({ 
  message = '登录已过期，请重新登录' 
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Result
      status="403"
      title="需要登录"
      subTitle={message}
      extra={
        <Button type="primary" onClick={handleLogin}>
          前往登录
        </Button>
      }
    />
  );
};

export default UnauthorizedError;