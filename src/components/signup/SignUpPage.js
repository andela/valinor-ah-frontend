import React, { Fragment } from 'react';
import Header from '../common/Header';
import emailIcon from '../../../public/assets/icons/mail-icon.svg';
import userIcon from '../../../public/assets/icons/user-icon.svg';
import facebookIcon from '../../../public/assets/icons/facebook-icon.svg';
import googleIcon from '../../../public/assets/icons/google-icon.svg';
import twitterIcon from '../../../public/assets/icons/twitter-icon.svg';

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
        <div className="site-content">
          <div className="container section">
            <div className="row justify-content-md-center">
              <div className="col-sm-12 col-md-4 blue-section">
                <div className="header">
                  <div className="box-intro">
                    <h1 id="welcome">Welcome to Author&apos;s Haven!</h1>
                    <div className="intro">
                      <p><span className="text-intro">Enter your personal details to start sharing your exciting ideas.</span></p>
                    </div>
                  </div>
                </div>

                <div className="body">
                  <span className="text-account">Already have an account?</span>
                  <button type="button" className="btn btn-outline-primary btn-rounded">LOG IN</button>
                </div>
              </div>
              <div className="col-sm-12 col-md-8 pale-section">
                <span className="text-create">Create account with your social media</span>
                <div className="social-button-group">
                  <button type="button" className="btn btn-google">
                    <div className="social-icon">
                      <img src={googleIcon} alt="google icon" />
                    </div>
                    <div className="social-text">Login with google</div>
                  </button>
                  <button type="button" className="btn btn-facebook">
                    <div className="social-icon">
                      <img src={facebookIcon} alt="facebook icon" />
                    </div>
                    <div className="social-text">Login with facebook</div>
                  </button>
                  <button type="button" className="btn btn-twitter">
                    <div className="social-icon">
                      <img src={twitterIcon} alt="twitter icon" />
                    </div>
                    <div className="social-text">Login with twitter</div>
                  </button>
                </div>
                <div className="signup-form">
                  <form className="form-signup">
                    <span className="text-sign-intro">sign up with your email</span>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text transparent email-addon" id="basic-addon1"><img src={userIcon} alt=" email icon" /></span>
                      </div>
                      <input type="text" className="form-control email-input transparent" placeholder="FULL NAME" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text transparent email-addon" id="basic-addon1"><img src={emailIcon} alt=" email icon" /></span>
                      </div>
                      <input type="email" className="form-control email-input transparent" placeholder="EMAIL ADDRESS" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button type="button" className="btn btn-outline-primary btn-rounded-blue">SIGN UP</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default SignUp;
