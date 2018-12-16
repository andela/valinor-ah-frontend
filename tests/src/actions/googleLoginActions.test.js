import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import socialLogin from '../../../src/actions/googleActions';
import {
  TRIGGER_LOGGEDIN,
  TRIGGER_FAILURE,
  TRIGGER_LOADING
} from '../../../src/actions/actionTypes';

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
    fetchMock.post(`${process.env.API_BASE_URL}/auth/social`, { user: { token: '9768586757659865' } });
    const expectedActions = [
      {
        isLoading: false, type: TRIGGER_LOADING,
      },
      {
        isLoggedIn: true, type: TRIGGER_LOGGEDIN
      }
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    });

    return store.dispatch(socialLogin(body)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('should call and dispatch request and failure actions', () => {
    fetchMock.post(`${process.env.API_BASE_URL}/auth/social`, { errors: { socialType: ['id is wrong'] } });
    const expectedActions = [
      {
        type: TRIGGER_LOADING, isLoading: false
      },
      {
        type: TRIGGER_FAILURE, isLoading: false, error: [{ socialType: ['id is wrong'] }]
      },
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: []
      }
    });

    return store.dispatch(socialLogin(body)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
