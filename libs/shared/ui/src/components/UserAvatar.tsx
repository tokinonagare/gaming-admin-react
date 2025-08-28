import React from 'react';
import { Avatar } from 'antd';
import DefaultAvatar from './DefaultAvatar';

interface UserAvatarProps {
  src?: string | null;
  size?: number | 'large' | 'small' | 'default';
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  size = 'default',
  alt = 'User Avatar',
  style = {},
  className = '',
  onClick,
}) => {
  // 如果没有头像URL，使用默认头像
  if (!src) {
    const numericSize = typeof size === 'number' ? size : 
                       size === 'large' ? 40 :
                       size === 'small' ? 24 : 32;
                       
    return (
      <DefaultAvatar 
        size={numericSize} 
        style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
        className={className}
        onClick={onClick}
      />
    );
  }

  // 有头像URL时使用Ant Design的Avatar组件
  return (
    <Avatar
      src={src}
      size={size}
      alt={alt}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
      className={className}
      onClick={onClick}
    />
  );
};

export default UserAvatar;