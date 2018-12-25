import {
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE
} from '../actions/actionTypes';

import initialState from '../store/initialState';

const { authors } = initialState;

const authorReducer = (state = authors, action) => {
  const { type } = action;
  switch (type) {
    case FETCH_AUTHORS_SUCCESS:
    case FETCH_AUTHORS_FAILURE:
      return { ...state, results: action.results, errors: action.errors };
    default:
      return state;
  }
};

export default authorReducer;
