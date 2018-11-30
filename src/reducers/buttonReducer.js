import initialState from './initialState';
import * as types from '../actions/actionTypes';

const { button } = initialState;
const buttonReducer = (state = button, action) => {
  const { type } = action;
  const { ON_BUTTON, OFF_BUTTON } = types;
  switch (type) {
    case ON_BUTTON:
      return {
        ...state, status: action.payload.status
      };
    case OFF_BUTTON:
      return {
        ...state, status: action.payload.status
      };
    default:
      return state;
  }
};

export default buttonReducer;
