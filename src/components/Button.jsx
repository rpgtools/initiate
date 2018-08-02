import React from 'react';

const Button = ({
  children,
  label,
  onClick
}) => {
  return (
    <button
      className="button"
      onClick={onClick}
      >
      {label}
      {children}
    </button>
  );
}

export default Button;
