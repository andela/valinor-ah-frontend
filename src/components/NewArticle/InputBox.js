import React from 'react';
import PropTypes from 'prop-types';

const InputBox = (props) => {
  const { label, placeholder, className } = props;
  return (
    <div className={className}>
      <span>{label}</span>
      <input type="text" name={label} placeholder={placeholder} />
    </div>
  );
};

InputBox.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default InputBox;
