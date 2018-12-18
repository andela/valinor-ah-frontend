import { FETCH_POPULAR_SUCCESS, FETCH_POPULAR_FAILURE } from '../actions/actionTypes';
import initialState from '../store/initialState';

const { popularArticles } = initialState;

const popularPostsReducer = (state = popularArticles, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_POPULAR_SUCCESS:
      return ({
        ...state,
        articles: payload.articles,
        error: []
      });
    case FETCH_POPULAR_FAILURE:
      return ({
        ...state,
        articles: [],
        error: payload.error
      });
    default:
      return state;
  }
};

export default popularPostsReducer;
