import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { label, className } = props;
  return (
    <button className={className} type="button">{label}</button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default Button;
