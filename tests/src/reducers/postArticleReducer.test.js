import postArticleReducer from '../../../src/reducers/postArticleReducer';

import {
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE,
} from '../../../src/actions/actionTypes';

test('should return empty initial state', () => {
  expect(postArticleReducer(undefined, {}))
    .toEqual({ errors: {} });
});

test('should handle post article success', () => {
  const action = {
    type: POST_ARTICLE_SUCCESS,
    payload: { article: {} }
  };

  expect(postArticleReducer({}, action))
    .toEqual({ errors: {} });
});

test('should handle post failure', () => {
  const action = {
    type: POST_ARTICLE_FAILURE,
    payload: { errors: { title: ['please enter a title'] } }
  };

  expect(postArticleReducer({ errors: [] }, action))
    .toEqual({ errors: { title: ['please enter a title'] } });
});
