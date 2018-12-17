import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import { sendEmailLink, logUserIn } from '../../../src/actions/loginActions';
import { TRIGGER_FAILURE, TRIGGER_LOADING, TRIGGER_LOGGEDIN } from '../../../src/actions/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userLoginDetails = {
  email: 'some.email@example.com'
};

describe('LoginAction test', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('test request to send email email link', () => {
    fetchMock.post(`${process.env.API_BASE_URL}/users/login`, {
      body: {
        status: 'success',
        message: 'email login link sent successfully'
      },
      headers: { Accept: 'application/json', 'content-type': 'application/json' }
    });

    const expectedActions = [];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    });

    return store.dispatch(sendEmailLink(userLoginDetails.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('test failure when sending email link', () => {
    fetchMock.post(`${process.env.API_BASE_URL}/users/login`, {
      body: { errors: [] }
    });

    const expectedActions = [{ error: [], isLoading: false, type: TRIGGER_FAILURE }];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    });

    return store.dispatch(sendEmailLink(userLoginDetails.email)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch failure on user login failure', () => {
    const querystring = '?token=some-query-string-with-token';
    fetchMock.getOnce(`${process.env.API_BASE_URL}/users/login${querystring}`, {
      body: { errors: ['An error occurred'] },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: TRIGGER_LOADING },
      { error: ['An error occurred'], isLoading: false, type: TRIGGER_FAILURE }
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    });

    return store.dispatch(logUserIn(querystring)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch success on user login', () => {
    const querystring = '?token=some-query-string-with-token';
    fetchMock.getOnce(`${process.env.API_BASE_URL}/users/login${querystring}`, {
      body: {
        status: 'success',
        message: 'you are logged in',
        user: {
          id: 12,
          fullName: 'Some Name',
          email: 'some.email',
          roleId: '3',
          token: 'westvhvchabvbsavon.hjbhjbibsdknknjndjn'
        }
      },
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { isLoading: true, type: TRIGGER_LOADING },
      { isLoading: false, type: TRIGGER_LOADING },
      { isLoggedIn: true, type: TRIGGER_LOGGEDIN }
    ];

    const store = mockStore({
      global: {
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    });

    return store.dispatch(logUserIn(querystring)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
