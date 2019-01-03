import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyUser } from '../../actions/userActions';

const queryString = new URLSearchParams(window.location.search);
const token = queryString.get('token');

export class VerifyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { VerifyUser } = this.props;
    VerifyUser(token);
  }

  render() {
    return (
      <div className="site-content vertical-center">
        <div className="container">
          <h1>Welcome to Author Haven</h1>
          <p>Please, take your time to select the catogeries of article of your choice below...</p>
        </div>
      </div>
    );
  }
}

VerifyPage.propTypes = {
  VerifyUser: PropTypes.func.isRequired
};

export const mapDispatchToProps = dispatch => ({
  VerifyUser: (userToken) => {
    dispatch(verifyUser(userToken));
  }
});

export default connect(null, mapDispatchToProps)(VerifyPage);
