import React from 'react';

import PropTypes from 'prop-types';
/**
 * This class renders the button component based on the props passed in.
 * @class
 * @classdesc Renders the button component.
 */
class Button extends React.Component {
/**
 * constructor for the dummy button component
 * @param {object} props - the information passed down
 * @constructor
 */
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * @description onclick eventhandler method.
   * @returns {void} - handles onlick event based on prop status
   */
  handleClick() {
    const { status } = this.props.status;
    if (!status) {
      this.props.turnOn();
    } else {
      this.props.turnOff();
    }
  }

  /**
   * @description
   * @returns {object} - This method renders the button component
   */
  render() {
    return (<button
      onClick={this.handleClick}>
      {`${this.props.status.status}`}
    </button>
    );
  }
}

Button.propTypes = {
  turnOn: PropTypes.func.isRequired,
  turnOff: PropTypes.func.isRequired,
  status: PropTypes.object
};

export default Button;
