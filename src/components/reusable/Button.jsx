import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  label,
  onClick,
  color,
  className,
  ...rest
}) => {
  return (
    <button
      className={`button button--${color} ${className}`}
      onClick={onClick}
      {...rest}>
      {label}
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'yellow', 'red'])
};
Button.defaultProps = {
  color: 'blue'
};

export default Button;
