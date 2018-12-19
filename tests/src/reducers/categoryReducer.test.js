import categoryReducer from '../../../src/reducers/categoryReducer';

import { FETCH_CATEGORY_TITLES_SUCCESS, FETCH_CATEGORY_TITLES_FAILURE } from '../../../src/actions/actionTypes';

test('should return empty initial state', () => {
  expect(categoryReducer(undefined, {}))
    .toEqual([]);
});

test('should handle category titles request success', () => {
  const action = {
    type: FETCH_CATEGORY_TITLES_SUCCESS,
    payload: { categoryTitlesArray: [] }
  };

  expect(categoryReducer({}, action))
    .toEqual([]);
});

test('should handle category titles request failure', () => {
  const action = {
    type: FETCH_CATEGORY_TITLES_FAILURE,
    payload: { error: 'dsaunljdasn' }
  };

  expect(categoryReducer(['initial'], action))
    .toEqual(['initial']);
});
