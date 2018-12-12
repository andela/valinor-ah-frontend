import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import iconPicker from '../../../utils/iconPicker';

const NavItems = (props) => {
  const { categories } = props;
  return (
    categories.map((category, index) => (
      <li className="nav-item left-margin" key={`category${String(index)}`}>
        <NavLink to={`/articles/category/${category.categoryName}`} className="nav-link">
          <span className="d-inline d-sm-inline d-md-inline d-lg-none pr-2">
            <img className="mobile-nav-icons" src={iconPicker(category.categoryName)} alt={category.categoryName} />
          </span>
          {category.categoryName}
        </NavLink>
      </li>
    ))
  );
};

NavItems.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default NavItems;
