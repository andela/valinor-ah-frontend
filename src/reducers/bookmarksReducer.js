import {
  BOOKMARK_ARTICLE_FAILURE,
  BOOKMARK_ARTICLE_SUCCESS,
  FETCH_USER_BOOKMARKS_FAILURE,
  FETCH_USER_BOOKMARKS_SUCCESS,
  UNBOOKMARK_ARTICLE_SUCCESS
} from '../actions/actionTypes';
import initialState from '../store/initialState';

const { bookmarks } = initialState;

const bookmarksReducer = (state = bookmarks, action) => {
  const { type } = action;
  switch (type) {
    case BOOKMARK_ARTICLE_SUCCESS:
    case UNBOOKMARK_ARTICLE_SUCCESS:
      return ({ ...state, ...action.payload });
    case BOOKMARK_ARTICLE_FAILURE:
      return ({ ...state, ...action.payload });
    case FETCH_USER_BOOKMARKS_SUCCESS:
      return ({ ...state, ...action.payload });
    case FETCH_USER_BOOKMARKS_FAILURE:
      return ({ ...state, ...action.payload });
    default:
      return state;
  }
};

export default bookmarksReducer;
