import articlesReducer from '../../../src/reducers/articlesReducer';

import { FETCH_CATEGORY_SUCCESS } from '../../../src/actions/actionTypes';

test('should return empty initial state', () => {
  expect(articlesReducer(undefined, {}))
    .toEqual({});
});

test('should handle category request success/failure', () => {
  const action = {
    type: FETCH_CATEGORY_SUCCESS,
    categoryName: 'lifestyle',
    payload: { test: 'test payload' }
  };

  expect(articlesReducer({}, action))
    .toEqual({
      lifestyle: {
        test: 'test payload'
      }
    });
});
