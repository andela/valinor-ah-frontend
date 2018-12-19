import tagReducer from '../../../src/reducers/tagReducer';

import { FETCH_TAG_TITLES_SUCCESS, FETCH_TAG_TITLES_FAILURE } from '../../../src/actions/actionTypes';

test('should return empty initial state', () => {
  expect(tagReducer(undefined, {}))
    .toEqual([]);
});

test('should handle tag titles request success', () => {
  const action = {
    type: FETCH_TAG_TITLES_SUCCESS,
    payload: { tagTitlesArray: [] }
  };

  expect(tagReducer({}, action))
    .toEqual([]);
});

test('should handle tag titles request failure', () => {
  const action = {
    type: FETCH_TAG_TITLES_FAILURE,
    payload: { error: 'dsaunljdasn' }
  };

  expect(tagReducer(['initial'], action))
    .toEqual(['initial']);
});
