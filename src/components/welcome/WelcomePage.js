import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logUserIn } from '../../actions/loginActions';

export class Welcome extends Component {
  componentDidMount() {
    const tokenQueryString = window.location.search;
    const { login, history } = this.props;
    login(tokenQueryString);
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  render() {
    return (
      <Fragment>
        <div className="welcome container">
          <h1>Welcome</h1>
          <p>Hold on while we are loggin you in...</p>
        </div>
      </Fragment>
    );
  }
}

Welcome.propTypes = {
  login: PropTypes.func,
  history: PropTypes.object.isRequired,
};

Welcome.defaultProps = {
  login: () => {}
};

const mapActionsToProps = {
  login: logUserIn
};

export default connect(null, mapActionsToProps)(Welcome);
