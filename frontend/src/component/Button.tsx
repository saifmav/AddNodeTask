import React from 'react';
import '../styles/Button.css';

const Button = ({ label, color, onClick, type, styles }:any) => {
 return (
    <button type={type} className="button" onClick={onClick} style={{ backgroundColor: color, ...styles }}>
      {label}
    </button>
 );
};

export default Button;