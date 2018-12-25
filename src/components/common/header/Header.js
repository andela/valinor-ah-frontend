import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import logo from '../../../../public/images/site-logo.png';
import '../../../../public/js/NavBar';
import Navbar from './NavBar';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const searchTerm = e.target.searchInput.value;
    history.push(`/search?search=${searchTerm}`);
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler" type="button" data-toggle="offcanvas" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars" />
          </button>
          <button className="btn btn-link my-sm-0 d-inline d-sm-inline d-lg-none dropdown-toggle" type="submit" id="navbarSearchLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search" />
          </button>
          <div className="dropdown-menu mobile-search-bar" aria-labelledby="navbarSearchLink">
            <form className="form-inline my-lg-0" onSubmit={this.handleSearchSubmit}>
              <input className="form-control" type="search" placeholder="Search..." aria-label="Search" name="searchInput" />
            </form>
          </div>
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="logo" />
          </NavLink>
          <Navbar handleSearchSubmit={this.handleSearchSubmit} />
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(Header);
