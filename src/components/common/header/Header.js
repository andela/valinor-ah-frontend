import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../../../public/images/site-logo.png';
import '../../../../public/js/NavBar';
import Navbar from './NavBar';

const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg">
      <button className="navbar-toggler" type="button" data-toggle="offcanvas" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars" />
      </button>
      <button className="btn btn-link my-sm-0 d-inline d-sm-inline d-lg-none dropdown-toggle" type="submit" id="navbarSearchLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-search" />
      </button>
      <div className="dropdown-menu mobile-search-bar" aria-labelledby="navbarSearchLink">
        <form className="form-inline my-lg-0">
          <input className="form-control" type="search" placeholder="Search..." aria-label="Search" />
        </form>
      </div>
      <a className="navbar-brand" href="/">
        <img src={logo} alt="logo" />
      </a>
      <Navbar />
    </nav>
  </header>
);

export default Header;
