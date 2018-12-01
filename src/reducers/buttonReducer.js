import initialState from '../store/initialState';
import { ON_BUTTON, OFF_BUTTON } from '../actions/actionTypes';

const { button } = initialState;
const buttonReducer = (state = button, action) => {
  const { type } = action;
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
