import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GoogleButton from '../common/GoogleButton';
import FacebookButton from '../common/FacebookButton';
import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import { globalLoading, globalFailure } from '../../actions/globalActions';
import login from '../../actions/googleActions';
import loginGoogle from '../../utils/loginGoogle';
import loginFacebook from '../../utils/loginFacebook';

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseGoogle(response) {
    const { handleLogin, failure } = this.props;
    loginGoogle(response, handleLogin, failure, 'google');
  }

  responseFacebook(response) {
    const { handleLogin, failure } = this.props;
    loginFacebook(response, handleLogin, failure);
  }

  render() {
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

                    <GoogleButton responseGoogle={this.responseGoogle} text="Login with Google" request={request} />
                  </div>

                  <div className="col-lg-4 social-button">
                    <FacebookButton responseFacebook={this.responseFacebook} text="Login with Facebook" request={request} />
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
  handleLogin: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ isLoggedIn: state.global.isLoggedIn });

const mapDispatchToProps = dispatch => ({
  handleLogin: userObject => dispatch(login(userObject)),
  request: isLoading => dispatch(globalLoading(isLoading)),
  failure: error => dispatch(globalFailure(error))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
