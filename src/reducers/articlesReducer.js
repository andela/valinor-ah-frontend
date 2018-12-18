import { FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { articlesByCategory } = initialState;

const articlesReducer = (state = articlesByCategory, action) => {
  const { type, categoryName, payload } = action;
  switch (type) {
    case FETCH_CATEGORY_SUCCESS:
    case FETCH_CATEGORY_FAILURE:
      return ({
        ...state,
        [categoryName]: payload
      });
    default:
      return state;
  }
};

export default articlesReducer;
