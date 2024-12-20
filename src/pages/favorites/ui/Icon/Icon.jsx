import React from 'react';

export function Icon({ name, className = '', onClick = () => {} }) {
  return (
    <span onClick={onClick} className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}