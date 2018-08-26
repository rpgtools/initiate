import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  label,
  onClick,
  color,
  ...rest
}) => {
  return (
    <button
      className={`button button--${color}`}
      onClick={onClick}
      {...rest}>
      {label}
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'yellow'])
};
Button.defaultProps = {
  color: 'blue'
};

export default Button;
