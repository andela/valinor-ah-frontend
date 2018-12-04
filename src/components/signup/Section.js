import React from 'react';
import Button from './Button';
import SocialButton from './SocialButton';
import Form from './Form';

const Section = () => (
  <div className="container section">
    <div className="row justify-content-md-center">
      <div className="col-sm-12 col-md-4 blue-section">
        <div className="header">
          <h1 id="Welcome">Welcome to Author's Haven!</h1>
          <p>Enter your personal details to start sharing your exciting ideas.</p>
        </div>

        <div className="body">
          <p>Already have an account?</p>
          <Button text="Login" btnClass="btn-rounded" />
        </div>
      </div>
      <div className="col-sm-12 col-md-8 pale-section">
        <h3>Create account with your social media</h3>
        <div className="social-button-group">
          <SocialButton text="Login with google" btnClass="btn-google" faClass="fab fa-google" />
          <SocialButton text="Login with facebook" btnClass="btn-facebook" faClass="fab fa-facebook" />
          <SocialButton text="Login with twitter" btnClass="btn-twitter" faClass="fab fa-twitter" />
        </div>
        <Form />
      </div>
    </div>
  </div>
);

export default Section;
