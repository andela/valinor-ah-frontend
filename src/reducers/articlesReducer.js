import { FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_REQUEST } from '../actions/actionTypes';

const articlesReducer = (state = {}, action) => {
  const { type, categoryName, payload } = action;
  switch (type) {
    case FETCH_CATEGORY_REQUEST:
      return ({
        ...state,
        [categoryName]: {}
      });
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
