import { connect } from 'react-redux';
import Button from '../components/Button';

import { toggleButtonOff, toggleButtonOn } from '../actions/buttonAction';


export const mapStateToProps = state => ({
  status: state.buttonReducer
});

export const mapDispatchToProps = dispatch => ({
  turnOn: () => {
    dispatch(toggleButtonOn(true));
  },
  turnOff: () => {
    dispatch(toggleButtonOff(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
