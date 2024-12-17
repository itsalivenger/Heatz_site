import React from 'react';
import styles from './Button.module.css';

export function Button({ children, className = '', handleClick, ...props }) {
  return (
    <button onClick={handleClick} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
}