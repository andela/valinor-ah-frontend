import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GoogleButton from '../common/GoogleButton';
import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import { register } from '../../actions/userActions';
import userIcon from '../../../public/assets/icons/user-icon.svg';
import { globalLoading, globalFailure } from '../../actions/globalActions';
import login from '../../actions/googleActions';
import loginGoogle from '../../utils/loginGoogle';
import loginFacebook from '../../utils/loginFacebook';
import FacebookButton from '../common/FacebookButton';

/**
 * @class - SignUp
 * @classdesc - Contain signup component
 */
export class SignUp extends Component {
  /**
   * @description - initialises on SignUp call
   * @param {obejct} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  componentDidMount() {
    const { failure } = this.props;
    failure([]);
  }

  responseGoogle(response) {
    const { handleLogin, failure } = this.props;
    loginGoogle(response, handleLogin, failure, 'google');
  }

  responseFacebook(response) {
    const { handleLogin, failure } = this.props;
    loginFacebook(response, handleLogin, failure);
  }


  /**
   * @description - handles onchange event
   * @param {*} event -
   */
  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
     * @description - handles onSubmit
     * @param {*} event -
     */
  handleSubmit(event) {
    event.preventDefault();
    const { fullName, email } = this.state;
    const { registerUser, history } = this.props;
    registerUser({ fullName, email }, history);
  }

  /**
   * @description - renders the component
   */
  render() {
    const { isLoggedIn, request, error } = this.props;
    const emailError = error[0] ? error[0].email : [];
    const fullNameError = error[0] ? error[0].fullName : [];

    const {
      fullName, email
    } = this.state;

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Fragment>
        <div className="site-content vertical-center">
          <div className="container">
            <div className="row login-wrapper">
              <div className="col-md-4 signup signup-border text-center ">
                <div className="row welcome-banner align-items-center">
                  <div className="col-md-12">
                    <h2 className="welcome-text">Welcome to Author&apos;s Haven!</h2>
                    <p className="text-center welcome-body">Enter your personal details to start sharing your exciting ideas.</p>
                  </div>
                </div>

                <div className="row login-banner">
                  <div className="col-md-12">
                    <p className="account-question">Already have an account?</p>

                    <Link to="/login" className="btn btn-outline-primary signup-btn px-5">LOG IN</Link>

                  </div>
                </div>
              </div>

              <div className="col-md-8 login-form login-form-border text-center">
                <h4 className="sign-in-text">Create account with your social media</h4>
                {/* Button Div */}
                <div className="row social-buttons-row">

                  <div className="col-lg-4 social-button">
                    <GoogleButton responseGoogle={this.responseGoogle} text="Signup with Google" request={request} />
                  </div>


                  <div className="col-lg-4 social-button">
                    <FacebookButton responseFacebook={this.responseFacebook} text="Signup with Facebook" request={request} />
                  </div>

                  <div className="col-lg-4 social-button">
                    <button type="button" className="btn btn-primary w-100 twitter-btn">
                      <i className="fab fa-twitter mr-2" />
                      Signup with Twitter
                    </button>
                  </div>
                </div>
                {/* End of button div */}

                {/* user input div */}
                <h5>Sign up with your email</h5>
                <form onSubmit={this.handleSubmit} className="form-signup">
                  <div className="row login-form-section text-center">
                    <div className="col-md-8 offset-md-2">
                      <ul
                        className="fullNameError error">
                        { fullNameError
                          ? fullNameError.map((errors, index) => (
                            <li className="fullNameErrorItem" key={`error-${String(index)}`}>{errors}</li>
                          )) : '' }
                      </ul>
                      <div className="input-group signup-inputs">
                        <div className="input-group-prepend">
                          <span className="input-group-text transparent email-addon " id="basic-addon1"><img src={userIcon} alt="email icon" /></span>
                        </div>
                        <input type="text" className="form-control email-input fullname" placeholder="FULL NAME" name="fullName" value={fullName} onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon1" required />
                      </div>
                      <ul
                        className="emailError error">
                        {emailError ? emailError.map((errors, index) => (
                          <li className="emailErrorItem" key={`error-${String(index)}`}>{errors}</li>
                        )) : ''}
                      </ul>
                      <div className="input-group signup-inputs">
                        <div className="input-group-prepend">
                          <span className="input-group-text transparent email-addon" id="basic-addon1"><img src={emailIcon} alt="email icon" /></span>
                        </div>
                        <input type="email" className="form-control email-input email" name="email" value={email} onChange={this.handleChange} placeholder="EMAIL ADDRESS" aria-label="Username" aria-describedby="basic-addon1" required />
                      </div>
                      <button type="submit" className="btn btn-outline-primary login-btn px-5 btn-rounded-blue">SIGN UP</button>
                    </div>
                  </div>
                </form>
                {/* End of user input */}

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  request: PropTypes.func.isRequired,
  failure: PropTypes.func.isRequired,
  error: PropTypes.array,
  history: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isLoggedIn: state.global.isLoggedIn,
  error: state.global.error,
});

SignUp.defaultProps = {
  error: []
};

const mapDispatchToProps = dispatch => ({
  handleLogin: userObject => dispatch(login(userObject)),
  request: isLoading => dispatch(globalLoading(isLoading)),
  failure: error => dispatch(globalFailure(error)),
  registerUser: (user, history) => {
    dispatch(register(user, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
