
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import socialLogin, { onRequestClick, onFailureClick } from '../../../src/actions/googleLoginActions';
import * as types from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const body = {
  fullName: 'Christopher Akanmu',
  email: 'chris@yahoo.com',
  socialType: 'twitter',
  socialId: 8975854678,
  avatarUrl: 'https://yourimagehere.com'
};

describe('test socialLogin async function', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it('should call and dispatch request and success actions', () => {
    fetchMock.post('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', { user: { token: '9768586757659865' } });
    const expectedActions = [
      { type: types.GOOGLE_LOGIN_SUCCESS, isLoading: false, isLoggedIn: true },
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    });

    return store.dispatch(socialLogin(body)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should call and dispatch request and failure actions', () => {
    fetchMock.post('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', { user: {} });
    const expectedActions = [
      { type: types.GOOGLE_LOGIN_FAILURE, isLoading: false, isLoggedIn: false },
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    });

    return store.dispatch(socialLogin(body)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Other functions', () => {
  it('it should test onRequestClick(), onFailureClick()', () => {
    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    });
    const firstResult = store.dispatch(onRequestClick());
    const secondResult = store.dispatch(onFailureClick());

    expect(onRequestClick()).toBeInstanceOf(Function);
    expect(onFailureClick()).toBeInstanceOf(Function);

    expect(firstResult).toEqual({
      type: 'GOOGLE_LOGIN_REQUEST',
      isLoading: true,
      isLoggedIn: false
    });

    expect(secondResult).toEqual({
      type: 'GOOGLE_LOGIN_FAILURE',
      isLoading: false,
      isLoggedIn: false
    });
  });
});
