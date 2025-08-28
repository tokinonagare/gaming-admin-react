import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface ButtonProps extends AntButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  return (
    <AntButton 
      type={variant === 'primary' ? 'primary' : variant === 'danger' ? 'primary' : 'default'}
      danger={variant === 'danger'}
      {...props}
    />
  );
};

export default Button;