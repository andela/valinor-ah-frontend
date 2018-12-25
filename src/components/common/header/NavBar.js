import React, { Component } from 'react';
import PropTypes from 'prop-types';
import more from '../../../../public/images/more.png';
import mockCategories from '../../../../mockdata/categories';
import NavItems from './NavItems';
import UserSettings from './UserSettings';

class NavBar extends Component {
  state = {
    categories: mockCategories
  };

  render() {
    const { categories } = this.state;
    const { handleSearchSubmit } = this.props;
    return (
      <div className="navbar-collapse offcanvas-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav navbar-links mr-auto">
          <div className="d-inline d-sm-inline d-md-inline d-lg-none section-header">
            <h6 className="m-0">Categories</h6>
            <hr />
          </div>

          <NavItems categories={categories.categories} />
          <li className="nav-item left-margin">
            <a className="nav-link" href="/" data-toggle="tooltip" data-placement="top" title="Click here to see more categories">
              <img className="more nav-img" src={more} alt="more" />
              <span className="d-inline d-sm-inline d-md-inline d-lg-none pl-2">More</span>
            </a>
          </li>
        </ul>
        <UserSettings handleSearchSubmit={handleSearchSubmit} />
      </div>
    );
  }
}

NavBar.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired
};

export default NavBar;
