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
    const { status, turnOff, turnOn } = this.props;
    if (!status.status) {
      turnOn();
    } else {
      turnOff();
    }
  }

  /**
   * @description
   * @returns {object} - This method renders the button component
   */
  render() {
    const { status } = this.props;
    return (
      <div>
        <button
          type="button"
          onClick={this.handleClick}>
          {`${status.status}`}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  turnOn: PropTypes.func.isRequired,
  turnOff: PropTypes.func.isRequired,
  status: PropTypes.object.isRequired
};

export default Button;
