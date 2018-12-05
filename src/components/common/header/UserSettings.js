import React from 'react';
import PropTypes from 'prop-types';
import loginMobile from '../../../../public/images/login.png';
import signup from '../../../../public/images/signup.png';
import Login from './Login';
import picture from '../../../../public/images/avatar.jpg';

const UserSettings = (props) => {
  const { isLoggedIn } = props;

  if (isLoggedIn) {
    return (
      <ul className="navbar-nav navbar-links user-links ml-auto">
        <div className="d-inline d-sm-inline d-lg-none section-header">
          <h6 className="m-0 pt-4">Settings</h6>
          <hr />
        </div>
        <li className="nav-item no-margin desktop-search">
          <a className="nav-link dropdown-toggle" id="navbarSearchLink" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <button className="btn btn-link my-sm-0 desktop-search-button" type="submit">
              <i className="fas fa-search fa-lg" />
            </button>
          </a>
          <div className="dropdown-menu desktop-search-bar" aria-labelledby="navbarSearchLink">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control" type="search" placeholder="Search..." aria-label="Search" />
            </form>
          </div>
        </li>
        <li className="nav-item no-margin">
          <a className="nav-link" href="/">
            <span className="d-inline d-sm-inline d-md-inline d-lg-none">
              <img className="nav-img" src={loginMobile} alt="login" />
            </span>
            <button className="btn btn-link my-sm-0 login-button" type="submit">
              Login
            </button>
          </a>
        </li>
        <li className="nav-item no-margin">
          <a className="nav-link" href="/">
            <span className="d-inline d-sm-inline d-md-inline d-lg-none">
              <img className="nav-img" src={signup} alt="signup" />
            </span>
            <button className="btn btn-outline-secondary my-sm-0 signup-button" type="submit">
              Signup
            </button>
          </a>
        </li>
      </ul>
    );
  }
  return <Login url={picture} />;
};

UserSettings.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default UserSettings;
