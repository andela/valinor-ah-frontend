import {
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE,
} from '../actions/actionTypes';

import initialState from '../store/initialState';

const { postArticle } = initialState;

const postArticleReducer = (state = postArticle, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_ARTICLE_FAILURE:
      return {
        ...postArticle,
        errors: { ...payload.errors }
      };
    case POST_ARTICLE_SUCCESS:
      return {
        ...postArticle,
        errors: {}
      };
    default:
      return state;
  }
};

export default postArticleReducer;
