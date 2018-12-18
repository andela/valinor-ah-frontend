import popularPostsReducer from '../../../src/reducers/popularPostsReducer';

import { FETCH_POPULAR_SUCCESS, FETCH_POPULAR_FAILURE } from '../../../src/actions/actionTypes';
import mockData from '../../../mockdata/articles';

const { articles } = mockData;

test('should return initial state', () => {
  expect(popularPostsReducer(undefined, []))
    .toEqual({ articles: [], error: [] });
});

test('should handle category request success', () => {
  const action = {
    type: FETCH_POPULAR_SUCCESS,
    payload: { articles }
  };

  expect(popularPostsReducer([], action))
    .toEqual({ articles, error: [] });
});

test('should handle category request failure', () => {
  const action = {
    type: FETCH_POPULAR_FAILURE,
    payload: { error: {} }
  };

  expect(popularPostsReducer([], action))
    .toEqual({ articles: [], error: {} });
});
