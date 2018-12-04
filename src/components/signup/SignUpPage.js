import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import userIcon from '../../../public/assets/icons/user-icon.svg';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Fragment>
        <Header />
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
                    <button type="button" className="btn btn-primary w-100 google-btn">
                      <i className="fab fa-google mr-2" />
                      Signup with Google
                    </button>
                  </div>

                  <div className="col-lg-4 social-button">
                    <button type="button" className="btn btn-primary w-100  facebook-btn">
                      <i className="fab fa-facebook-f mr-2" />
                      Signup with Facebook
                    </button>
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
                <form>
                  <div className="row login-form-section text-center">
                    <div className="col-md-8 offset-md-2">
                      <div className="input-group signup-inputs">
                        <div className="input-group-prepend">
                          <span className="input-group-text transparent email-addon " id="basic-addon1"><img src={userIcon} alt="email icon" /></span>
                        </div>
                        <input type="text" className="form-control email-input" placeholder="FULL NAME" aria-label="Username" aria-describedby="basic-addon1" required />
                      </div>

                      <div className="input-group signup-inputs">
                        <div className="input-group-prepend">
                          <span className="input-group-text transparent email-addon" id="basic-addon1"><img src={emailIcon} alt="email icon" /></span>
                        </div>
                        <input type="email" className="form-control email-input" placeholder="EMAIL ADDRESS" aria-label="Username" aria-describedby="basic-addon1" required />
                      </div>
                      <button type="submit" className="btn btn-outline-primary login-btn px-5">SIGN UP</button>
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
export default SignUp;
