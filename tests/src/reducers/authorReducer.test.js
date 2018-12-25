import authorReducer from '../../../src/reducers/authorReducer';
import { FETCH_AUTHORS_SUCCESS } from '../../../src/actions/actionTypes';

const initialState = {
  results: [],
  errors: {},
};

describe('TEST AUTHORS REDUCER', () => {
  it('should return isLoading false, isLoggedIn true', () => {
    expect(authorReducer(
      initialState,
      {
        type: FETCH_AUTHORS_SUCCESS,
        results: { authors: [] },
        errors: ''
      }
    )).toEqual({
      results: { authors: [] },
      errors: ''
    });
  });
});
