import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  label,
  onClick,
  color
}) => {
  return (
    <button
      className={`button button--${color}`}
      onClick={onClick}
      >
      {label}
      {children}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['blue', 'yellow', 'red']) //@TODO: these should be semantic, not presentational (e.g. primary, secondary, warning)
};
Button.defaultProps = {
  color: 'blue'
};

export default Button;
