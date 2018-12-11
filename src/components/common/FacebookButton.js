import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PropTypes from 'prop-types';

const FacebookButton = ({ responseFacebook, request, text }) => (
  <FacebookLogin
  appId={process.env.FACEBOOK_APP_ID}
  autoLoad={false}
  onClick={request}
  fields="name,email,picture"
  callback={responseFacebook}
  // eslint-disable-next-line react/jsx-no-bind
  render={renderProps => (
    <button type="button" className="btn btn-primary w-100  facebook-btn" onClick={renderProps.onClick}>
      <i className="fab fa-facebook-f mr-2" />
      {text}
    </button>
  )}
/>
);

FacebookButton.propTypes = {
  responseFacebook: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default FacebookButton;
