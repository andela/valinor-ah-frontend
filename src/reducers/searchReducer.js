import initialState from '../store/initialState';
import {
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_FAILURE
} from '../actions/actionTypes';

const { searchResults } = initialState;
const searchReducer = (state = searchResults, action) => {
  const { type } = action;
  switch (type) {
    case SEARCH_RESULTS_SUCCESS:
    case SEARCH_RESULTS_FAILURE:
      return {
        ...state,
        results: action.results,
        errors: action.errors,
        query: action.query
      };
    default:
      return state;
  }
};

export default searchReducer;
