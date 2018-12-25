import searchReducer from '../../../src/reducers/searchReducer';
import {
  SEARCH_RESULTS_SUCCESS,
  SEARCH_RESULTS_FAILURE
} from '../../../src/actions/actionTypes';

const initialState = {
  results: {},
  query: 'all?limit=10&page=1',
  errors: ''
};

describe('searchReducer', () => {
  it('should return the initial state', () => {
    expect(searchReducer(initialState, {})).toEqual(initialState);
  });

  it('should return isLoading false, isLoggedIn true', () => {
    expect(searchReducer(
      initialState,
      {
        type: SEARCH_RESULTS_SUCCESS,
        results: { articles: [] },
        query: 'all?limit=10&page=1',
        errors: ''
      }
    )).toEqual({
      results: { articles: [] },
      query: 'all?limit=10&page=1',
      errors: ''
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(searchReducer(
      initialState,
      {
        type: SEARCH_RESULTS_FAILURE,
        results: {},
        query: 'all?limit=10&page=1',
        errors: 'no results'
      }
    )).toEqual({
      results: {},
      query: 'all?limit=10&page=1',
      errors: 'no results'
    });
  });
});
