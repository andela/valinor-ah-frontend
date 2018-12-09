import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import more from '../../../../public/images/more.png';
import mockCategories from '../../../../mockdata/categories';
import NavItems from './NavItems';
import UserSettings from './UserSettings';

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: mockCategories,
    };
  }

  render() {
    const { status } = this.props;
    const { categories } = this.state;
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
        <UserSettings isLoggedIn={status.isLoggedIn} />
      </div>
    );
  }
}

NavBar.propTypes = {
  status: PropTypes.object.isRequired
};

export const mapStateToProps = state => ({
  status: state.global
});

export default connect(mapStateToProps)(NavBar);
