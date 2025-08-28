import React from 'react';

interface DefaultAvatarProps {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ 
  size = 32, 
  style = {}, 
  className = '',
  onClick 
}) => {
  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  };

  const hornStyle: React.CSSProperties = {
    position: 'absolute',
    top: '-6px',
    width: '0',
    height: '0',
    borderLeft: '4px solid transparent',
    borderRight: '4px solid transparent',
    borderBottom: '10px solid #ff4444',
  };

  const leftHornStyle = {
    ...hornStyle,
    left: '25%',
    transform: 'rotate(-15deg)',
  };

  const rightHornStyle = {
    ...hornStyle,
    right: '25%',
    transform: 'rotate(15deg)',
  };

  const eyeStyle: React.CSSProperties = {
    width: '2px',
    height: '4px',
    backgroundColor: '#000',
    borderRadius: '50%',
    margin: '0 2px',
  };

  const mouthStyle: React.CSSProperties = {
    width: '8px',
    height: '4px',
    border: '1px solid #000',
    borderTop: 'none',
    borderRadius: '0 0 8px 8px',
    marginTop: '2px',
  };

  const faceContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '2px',
  };

  return (
    <div className={className} style={avatarStyle} onClick={onClick}>
      <div style={leftHornStyle}></div>
      <div style={rightHornStyle}></div>
      <div style={faceContainerStyle}>
        <div style={{ display: 'flex', marginBottom: '1px' }}>
          <div style={eyeStyle}></div>
          <div style={eyeStyle}></div>
        </div>
        <div style={mouthStyle}></div>
      </div>
    </div>
  );
};

export default DefaultAvatar;