import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  const { isLoading } = props;
  let style;
  if (!isLoading) {
    style = { display: 'none' };
  } else {
    style = { display: 'block' };
  }
  return (
    <div style={style} className="spinner-overlay">
      <i className="fas fa-spinner" />
    </div>
  );
};

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
export default Spinner;
