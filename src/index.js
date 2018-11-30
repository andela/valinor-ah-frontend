/* eslint-disable */
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';

class Index extends Component {
  render() {
    return <h1>Welcome to Author's Haven!</h1>;
  }
}

render(<Index />, document.getElementById('index'));
