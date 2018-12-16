
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import login, { onRequestClick, onFailureClick } from '../../actions/googleLoginActions';
import loginGoogle from '../../utils/loginGoogle';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  responseGoogle(response) {
    // eslint-disable-next-line react/prop-types
    const { handleLogin, failure } = this.props;
    loginGoogle(response, handleLogin, failure, 'google');
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { isLoggedIn, request } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <div className="site-content vertical-center">
          <div className="container">
            <div className="row login-wrapper">

              <div className="col-md-4 signup text-center order-md-2">
                <div className="row welcome-banner align-items-center">
                  <div className="col-md-12">
                    <h2 className="welcome-text">Welcome back!</h2>
                    <p className="text-center welcome-body">To keep sharing your exciting Ideas please log in into your account</p>
                  </div>
                </div>

                <div className="row login-banner">
                  <div className="col-md-12">
                    <p className="account-question-login account-question">don&apos;t have an account yet?</p>

                    <Link to="/signup" className="btn btn-outline-primary signup-btn px-5">SIGNUP</Link>

                  </div>
                </div>
              </div>

              <div className="col-md-8 login-form text-center order-md-1">
                <h4 className="sign-in-text">Sign in to your account</h4>
                {/* Button Div */}
                <div className="row social-buttons-row">

                  <div className="col-lg-4 social-button">
                    <GoogleLogin
                      clientId={process.env.GOOGLE_CLIENT_ID}
                      // eslint-disable-next-line react/jsx-no-bind
                      render={renderProps => (
                        <button onClick={renderProps.onClick} type="button" className="btn btn-primary w-100 google-btn">
                          <i className="fab fa-google mr-2" />
                          Login with Google
                        </button>
                      )}
                      buttonText="Login with Google"
                      onSuccess={this.responseGoogle}
                      onFailure={this.responseGoogle}
                      onRequest={request}
                    />
                  </div>

                  <div className="col-lg-4 social-button">
                    <button type="button" className="btn btn-primary w-100  facebook-btn">
                      <i className="fab fa-facebook-f mr-2" />
                      Login with Facebook
                    </button>
                  </div>

                  <div className="col-lg-4 social-button">
                    <button type="button" className="btn btn-primary w-100 twitter-btn">
                      <i className="fab fa-twitter mr-2" />
                      Login with Twitter
                    </button>
                  </div>
                </div>
                {/* End of button div */}

                {/* Email input div */}
                <div id="login-form">
                  <h5>Sign in with your email</h5>
                  <form id="login-form">
                    <div className="row login-form-section text-center">
                      <div className="col-md-8 offset-md-2">
                        <div className="input-group mb-4 login-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text transparent email-addon" id="basic-addon1"><img src={emailIcon} alt="email icon" /></span>
                          </div>
                          <input type="email" className="form-control email-input" placeholder="EMAIL ADDRESS" aria-label="Username" aria-describedby="basic-addon1" required />
                        </div>
                        <button type="submit" className="btn btn-outline-primary login-btn login-btn-add mt-3 px-5">LOGIN</button>
                      </div>
                    </div>
                  </form>
                  {/* End of Email input */}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  request: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isLoggedIn: state.googleLoginReducer.global.isLoggedIn });

const mapDispatchToProps = dispatch => ({
  handleLogin: userObject => dispatch(login(userObject)),
  request: () => dispatch(onRequestClick()),
  failure: () => dispatch(onFailureClick())
});

export const unwrappedComponent = LoginPage;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
