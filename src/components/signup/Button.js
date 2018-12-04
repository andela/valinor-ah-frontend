import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  btnClass, text
}) => (
  <button type="button" className={`btn btn-outline-primary ${btnClass}`}>{text}</button>
);
Button.propTypes = {
  text: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
};
export default Button;
