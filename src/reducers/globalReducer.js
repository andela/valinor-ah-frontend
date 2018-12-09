import initialState from '../store/initialState';
import {
  FACEBOOK_AUTH_FAILURE,
  FACEBOOK_AUTH_REQUEST,
  FACEBOOK_AUTH_SUCCESS,
} from '../actions/actionTypes';

const { global } = initialState;

const globalReducer = (state = global, action) => {
  const { type } = action;
  switch (type) {
    case FACEBOOK_AUTH_REQUEST:
      return { ...state, ...action.payload };
    case FACEBOOK_AUTH_FAILURE:
      return { ...state, ...action.payload };
    case FACEBOOK_AUTH_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default globalReducer;
