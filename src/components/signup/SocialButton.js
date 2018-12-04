import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  btnClass, text, faClass
}) => (
  <button type="button" className={btnClass}>
    <i className={faClass} />
    {' '}
    {text}
  </button>
);
Button.propTypes = {
  text: PropTypes.string.isRequired,
  btnClass: PropTypes.string.isRequired,
  faClass: PropTypes.string.isRequired,
};
export default Button;
