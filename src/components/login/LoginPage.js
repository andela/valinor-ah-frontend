import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import toastr from 'toastr';
import { connect } from 'react-redux';
import {
  facebookAuth,
  facebookAuthFailure,
} from '../../actions/userActions';
import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import { isUserLoggedIn } from '../../utils/verifyToken';
import loginFacebook from '../../utils/loginFacebook';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  componentWillMount() {
    const { history, logout } = this.props;
    if (isUserLoggedIn()) return history.push('/');
    logout();
  }

  componentDidUpdate(prevProps) {
    const { history, status } = this.props;
    if (!prevProps.status.isLoggedIn && status.isLoggedIn) {
      toastr.success('You are logged in');
      return history.push('/');
    }
  }


  responseFacebook(response) {
    const {
      retrieveUserFacebookData,
      triggerFacebookAuthFailure,
    } = this.props;
    loginFacebook(response, retrieveUserFacebookData, triggerFacebookAuthFailure);
  }

  render() {
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
                    <button type="button" className="btn btn-primary w-100 google-btn">
                      <i className="fab fa-google mr-2" />
                      Login with Google
                    </button>
                  </div>

                  <div className="col-lg-4 social-button">
                    <FacebookLogin
                      appId={process.env.FACEBOOK_APP_ID}
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={this.responseFacebook}
                      // eslint-disable-next-line react/jsx-no-bind
                      render={renderProps => (
                        <button type="button" className="btn btn-primary w-100  facebook-btn" onClick={renderProps.onClick}>
                          <i className="fab fa-facebook-f mr-2" />
                          Login with Facebook
                        </button>
                      )}
                    />
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
  status: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  retrieveUserFacebookData: PropTypes.func.isRequired,
  triggerFacebookAuthFailure: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  status: state.global
});

export const mapDispatchToProps = dispatch => ({
  retrieveUserFacebookData: (data) => {
    dispatch(facebookAuth(data));
  },
  triggerFacebookAuthFailure: () => {
    dispatch(facebookAuthFailure({ error: 'facebook authentication failed' }));
    toastr.error('Facebook authentication failed');
  },
  logout: () => {
    dispatch(facebookAuthFailure({ error: 'your session expired' }));
    localStorage.removeItem('user');
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
