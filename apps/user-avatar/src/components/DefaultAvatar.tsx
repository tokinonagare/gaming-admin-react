import React from 'react';

interface DefaultAvatarProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ 
  size = 32, 
  style = {}, 
  className = '' 
}) => {
  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
    position: 'relative',
    ...style
  };

  const hornStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-8px',
    width: '0',
    height: '0',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderBottom: '12px solid #ff4444',
  };

  const leftHornStyle = {
    ...hornStyle,
    left: '20%',
  };

  const rightHornStyle = {
    ...hornStyle,
    right: '20%',
  };

  const eyeStyle: React.CSSProperties = {
    width: '3px',
    height: '6px',
    backgroundColor: '#000',
    borderRadius: '50%',
    margin: '0 2px',
  };

  const mouthStyle: React.CSSProperties = {
    width: '12px',
    height: '6px',
    border: '2px solid #000',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    marginTop: '2px',
  };

  return (
    <div className={className} style={avatarStyle}>
      <div style={leftHornStyle}></div>
      <div style={rightHornStyle}></div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', marginBottom: '2px' }}>
          <div style={eyeStyle}></div>
          <div style={eyeStyle}></div>
        </div>
        <div style={mouthStyle}></div>
      </div>
    </div>
  );
};

export default DefaultAvatar;