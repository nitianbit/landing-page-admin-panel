import React from 'react';

const Loader = ({ size = 40, color = '#64506b' }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // This makes the container full height of the viewport
    width: '100%',
  };

  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `4px solid ${color}`,
    borderTop: '4px solid transparent',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={loaderStyle}></div>
    </div>
  );
};

export default Loader;

