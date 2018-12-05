import React from 'react';
import PropTypes from 'prop-types';
import iconPicker from '../../../utils/iconPicker';

const NavItems = (props) => {
  const { categories } = props;
  return (
    categories.map((category, index) => (
      <li className="nav-item left-margin" key={`category${String(index)}`}>
        <a className="nav-link" href="/">
          <span className="d-inline d-sm-inline d-md-inline d-lg-none pr-2">
            <img className="mobile-nav-icons" src={iconPicker(category.categoryName)} alt={category.categoryName} />
          </span>
          {category.categoryName}
        </a>
      </li>
    ))
  );
};

NavItems.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default NavItems;
