import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import searchAction, { searchResultFailure, searchResultSuccess } from '../../../src/actions/searchActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SEARCH ACTIONS', () => {
  it('SEARCH FAILURE', () => {
    const expectedActions = [
      {
        type: 'SEARCH_RESULTS_FAILURE', results: {}, errors: 'no authors on authors haven', query: 'fashion?limit=10'
      }
    ];
    const store = mockStore({
      searchResults: {
        results: [],
        errors: {},
        query: ''
      }
    });

    store.dispatch(searchResultFailure('no authors on authors haven', 'fashion?limit=10'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('AUHTORS SUCCESS', () => {
    const expectedActions = [
      {
        type: 'SEARCH_RESULTS_SUCCESS', results: 'all authors on authors haven', errors: '', query: 'fashion?limit=10'
      }
    ];
    const store = mockStore({
      searchResults: {
        results: [],
        errors: {},
        query: ''
      }
    });

    store.dispatch(searchResultSuccess('all authors on authors haven', 'fashion?limit=10'));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('SEARCH ACTION API CALL', () => {
    const initialState = {
      searchResults: {
        results: [],
        errors: {},
        query: ''
      }
    };
    const store = mockStore(initialState);
    const expectedActions = [
      {
        isLoading: true, type: 'TRIGGER_LOADING'
      },
      {
        isLoading: false, type: 'TRIGGER_LOADING'
      },
      {
        errors: 'no authors', query: 'fashion?limit=10', results: {}, type: 'SEARCH_RESULTS_FAILURE'
      }
    ];

    fetchMock.get(`${process.env.API_BASE_URL}/articles/category/fashion?limit=10`, { status: 'failure', errors: { message: 'no authors' } });
    return store.dispatch(searchAction('fashion?limit=10'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
