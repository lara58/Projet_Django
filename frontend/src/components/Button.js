// src/components/Button.js
import React from 'react';

const Button = ({ label, onClick, style }) => {
  return (
    <button onClick={onClick} style={style || defaultStyle}>
      {label}
    </button>
  );
};

const defaultStyle = {
  padding: '10px 20px',
  backgroundColor: '#39ff14',
  color: 'black',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default Button;
