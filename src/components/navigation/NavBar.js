import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand logo" href="/">Author's Haven |</a>
    <NavLink activeStyle={{ color: 'red' }} className="nav-item nav-link active" exact to="/">Home</NavLink>
    <NavLink activeStyle={{ color: 'red' }} className="nav-item nav-link" exact to="/login">Login</NavLink>
  </nav>
);

export default NavBar;
