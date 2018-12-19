import {
  FETCH_CATEGORY_TITLES_SUCCESS,
  FETCH_CATEGORY_TITLES_FAILURE,
} from '../actions/actionTypes';

import initialState from '../store/initialState';

const { categoryTitles } = initialState;

const categoryReducer = (state = categoryTitles, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CATEGORY_TITLES_SUCCESS:
      return [
        ...payload.categoryTitlesArray,
      ];
    case FETCH_CATEGORY_TITLES_FAILURE:
    default:
      return state;
  }
};

export default categoryReducer;
