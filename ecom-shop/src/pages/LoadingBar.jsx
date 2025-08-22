import React from 'react';

const LoadingMask = ({ fixed = false }) => {
  const loadingStyle = {
    position: fixed ? 'fixed' : 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 9999,
    opacity: 0.4,
  };

  const spinnerBeforeStyle = {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-25px 0 0 -25px',
    backgroundColor: 'rgba(0,0,0,0)',
    border: '5px solid rgba(0,183,229,0.9)',
    opacity: 0.9,
    borderRight: '5px solid rgba(0,0,0,0)',
    borderLeft: '5px solid rgba(0,0,0,0)',
    borderRadius: '50%',
    boxShadow: '0 0 35px #2187e7',
    width: '50px',
    height: '50px',
    animation: 'spinPulse 1s infinite ease-in-out',
  };

  const spinnerAfterStyle = {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-15px 0 0 -15px',
    backgroundColor: 'rgba(0,0,0,0)',
    border: '5px solid rgba(0,183,229,0.9)',
    opacity: 0.9,
    borderLeft: '5px solid rgba(0,0,0,0)',
    borderRight: '5px solid rgba(0,0,0,0)',
    borderRadius: '50%',
    boxShadow: '0 0 15px #2187e7',
    width: '30px',
    height: '30px',
    animation: 'spinoffPulse 1s infinite linear',
  };

  return (
    <>
      <style>{`
        @keyframes spinPulse {
          0% { transform: rotate(160deg); opacity: 0; box-shadow: 0 0 1px #2187e7; }
          50% { transform: rotate(145deg); opacity: 1; }
          100% { transform: rotate(-320deg); opacity: 0; }
        }
        @keyframes spinoffPulse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div style={loadingStyle}>
        <div style={spinnerBeforeStyle}></div>
        <div style={spinnerAfterStyle}></div>
      </div>
    </>
  );
};

export default LoadingMask;
