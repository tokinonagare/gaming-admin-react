import React from 'react';
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

// 简化Button组件，直接使用Ant Design的Button
const Button: React.FC<AntButtonProps> = (props) => {
  return <AntButton {...props} />;
};

export default Button;