import initialState from '../store/initialState';
import { GOOGLE_LOGIN_SUCCESS, GOOGLE_LOGIN_FAILURE, GOOGLE_LOGIN_REQUEST } from '../actions/actionTypes';

const changeState = (state, action) => {
  const newState = { ...state };
  newState.global.isLoggedIn = action.isLoggedIn;
  newState.global.isLoading = action.isLoading;
  return newState;
};

const googleLoginReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case GOOGLE_LOGIN_SUCCESS:
      return changeState(state, action);
    case GOOGLE_LOGIN_FAILURE:
      return changeState(state, action);
    case GOOGLE_LOGIN_REQUEST:
      return changeState(state, action);
    default:
      return state;
  }
};


export default googleLoginReducer;
