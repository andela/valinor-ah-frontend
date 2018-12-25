import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import fetchAuthors, { requestAuthorsFailure, requestAuthorsSuccess } from '../../../src/actions/authorsActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('AUTHORS ACTIONS', () => {
  it('AUHTORS FAILURE', () => {
    const expectedActions = [
      {
        type: 'FETCH_AUTHORS_FAILURE', results: [], errors: 'no authors on authors haven'
      }
    ];
    const store = mockStore({
      authors: {
        results: [],
        errors: {},
      }
    });

    store.dispatch(requestAuthorsFailure('no authors on authors haven'));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('AUHTORS SUCCESS', () => {
    const expectedActions = [
      {
        type: 'FETCH_AUTHORS_SUCCESS', results: { results: 'all authors on authors haven' }, errors: {}
      }
    ];
    const store = mockStore({
      authors: {
        results: [],
        errors: {},
      }
    });

    store.dispatch(requestAuthorsSuccess({ results: 'all authors on authors haven' }));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('AUTHORS API CALL', () => {
    const initialState = {
      authors: {
        results: [],
        errors: {},
      }
    };
    const store = mockStore(initialState);
    const expectedActions = [
      {
        type: 'FETCH_AUTHORS_FAILURE', results: [], errors: 'no authors'
      }
    ];

    fetchMock.get(`${process.env.API_BASE_URL}/users/authors`, { status: 'failure', errors: { message: 'no authors' } });
    return store.dispatch(fetchAuthors())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
