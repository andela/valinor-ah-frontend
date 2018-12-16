import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

const GoogleButton = (props) => {
  const { responseGoogle, text, request } = props;

  function requestCall() {
    return request(true);
  }

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      // eslint-disable-next-line react/jsx-no-bind
      render={renderProps => (
        <button onClick={renderProps.onClick} type="button" className="btn btn-primary w-100 google-btn">
          <i className="fab fa-google mr-2" />
          {text}
        </button>
      )}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      onRequest={requestCall}
    />
  );
};

GoogleButton.propTypes = {
  responseGoogle: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default GoogleButton;
