import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isLoading } = this.props;
    let style;
    if (!isLoading) {
      style = { display: 'none' };
    } else {
      style = { display: 'block' };
    }
    return (
      <div style={style} className="spinner-overlay">
        <i className="fas fa-spinner" />
      </div>
    );
  }
}

Spinner.propTypes = {
  isLoading: PropTypes.bool.isRequired
};
export const mapStateToProps = state => ({
  isLoading: state.global.isLoading
});
export default connect(mapStateToProps)(Spinner);
