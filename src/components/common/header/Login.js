import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import newArticle from '../../../../public/images/new.svg';
import bell from '../../../../public/images/bell.svg';
import logout from '../../../../public/images/logout.png';
import favorites from '../../../../public/images/favorites.png';
import preferences from '../../../../public/images/preferences.png';
import { globalLoggedIn } from '../../../actions/globalActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.logOutUser = this.logOutUser.bind(this);
  }

  logOutUser() {
    const { logOutAction } = this.props;
    logOutAction();
    localStorage.clear();
    return toastr.success('Goodbye! Come back soon');
  }

  render() {
    const { url } = this.props;


    return (
      <ul className="navbar-nav navbar-links logged-in ml-auto">
        <div className="d-inline d-sm-inline d-lg-none section-header">
          <h6 className="m-0">Settings</h6>
          <hr />
        </div>
        <li className="nav-item no-margin d-none d-sm-none d-md-none d-lg-inline">
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
        <li className="nav-item">
          <NavLink className="nav-link" to="/new-article">
            <span className="pr-2">
              <img className="d-none d-sm-none d-lg-inline mt-2 nav-img" src={newArticle} alt="new article" />
            </span>
            <span className="d-inline d-sm-inline d-lg-none">Profile</span>
          </NavLink>
        </li>

        <li className="nav-item dropdown d-none d-lg-inline">
          <a className="nav-link dropdown-toggle" href="/" id="notificationDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="notif-count">
              <img className="d-none d-sm-none d-lg-inline mt-2 nav-img" src={bell} alt="notifications" />
              <span className="badge d-none d-sm-none d-lg-inline">4</span>
            </span>
          </a>
          <div className="dropdown-menu" aria-labelledby="notificationDropdown">
            <a className="dropdown-item" href="/">Item1</a>
            <a className="dropdown-item" href="/">Item2</a>
            <a className="dropdown-item" href="/">Item3</a>
            <a className="dropdown-item" href="/">Item4</a>
          </div>
        </li>

        <li className="nav-item d-inline d-lg-none">
          <a className="nav-link" href="/">
            <span className="pr-2">
              <img className="d-inline d-sm-inline d-lg-none mobile-nav-icons" src={favorites} alt="favorites" />
            </span>
            <span>Favorites</span>
          </a>
        </li>

        <li className="nav-item dropdown d-none d-sm-none d-md-none d-lg-inline">
          <a className="nav-link dropdown" href="/" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="pr-2">
              <img className="d-none d-sm-none user-photo d-lg-inline" src={url} alt="my account" />
            </span>
          </a>
          <div className="dropdown-menu" aria-labelledby="notificationDropdown">
            <a className="dropdown-item" href="/">Profile</a>
            <a className="dropdown-item" href="/">Favourites</a>
            <a className="dropdown-item" href="/">Preference</a>
            <a onClick={this.logOutUser} className="dropdown-item" href="#">Logout</a>
          </div>
        </li>

        <li className="nav-item d-inline d-lg-none">
          <a className="nav-link" href="/">
            <span className="pr-2">
              <img className="d-inline d-sm-inline d-lg-none mobile-nav-icons" src={preferences} alt="preferences" />
            </span>
            <span>Preferences</span>
          </a>
        </li>

        <li className="nav-item d-inline d-sm-inline d-md-inline d-lg-none">
          <a onClick={this.logOutUser} className="nav-link" href="#">
            <span className="pr-2">
              <img className="mobile-nav-icons" src={logout} alt="logout" />
            </span>
            <span>Logout</span>
          </a>
        </li>

      </ul>
    );
  }
}


Login.propTypes = {
  url: PropTypes.string.isRequired,
  logOutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logOutAction: () => dispatch(globalLoggedIn(false))
});

export default connect(null, mapDispatchToProps)(Login);
