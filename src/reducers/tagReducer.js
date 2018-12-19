import {
  FETCH_TAG_TITLES_SUCCESS,
  FETCH_TAG_TITLES_FAILURE,
} from '../actions/actionTypes';

import initialState from '../store/initialState';

const { tagTitles } = initialState;

const categoryReducer = (state = tagTitles, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_TAG_TITLES_SUCCESS:
      return [
        ...payload.tagTitlesArray,
      ];
    case FETCH_TAG_TITLES_FAILURE:
    default:
      return state;
  }
};

export default categoryReducer;
