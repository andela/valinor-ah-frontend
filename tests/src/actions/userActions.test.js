import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import {
  facebookAuth,
  facebookAuthFailure,
  facebookAuthRequest,
  facebookAuthSuccess
}
  from '../../../src/actions/userActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('USER FACEBOOK SOCIAL ACTION TESTS', () => {
  test('facebookAuthRequestAction should trigger facebook request action to store', () => {
    const desiredAction = {
      type: 'FACEBOOK_AUTH_REQUEST',
      payload: {
        isLoading: true
      }
    };
    expect(facebookAuthRequest()).toEqual(desiredAction);
  });
  test('facebookAuthSuccess action should trigger the below action to store', () => {
    const desiredAction = {
      type: 'FACEBOOK_AUTH_SUCCESS',
      payload: {
        isLoading: false,
        isLoggedIn: true
      }
    };
    expect(facebookAuthSuccess()).toEqual(desiredAction);
  });
  test('facebookSignupRequestFailure action should trigger the below action to store', () => {
    const desiredAction = {
      type: 'FACEBOOK_AUTH_FAILURE',
      payload: {
        isLoading: false,
        isLoggedIn: false,
        errors: [{ error: 'app crashed' }]
      }
    };
    expect(facebookAuthFailure({ error: 'app crashed' })).toEqual(desiredAction);
  });

  describe('TESTING ASYNC ACTIONS', () => {
    describe('Testing Async action facebookAuth', () => {
      it('should successfully dispatch all user actions for user to signup on facebook', () => {
        const data = {
          name: 'Augustine Ezinwa',
          email: 'ugustineezinwa@gmail.com',
          userID: '3242342933232323',
          picture: {
            data: {
              url: 'https://donkey.com/my-pictures'
            }
          }
        };
        const mockApiResult = {
          message: 'New User successfully created',
          user: {
            id: 22,
            fullName: 'Augustine Ezinwa',
            email: 'augustineezinwa@gmail.com',
            socialType: 'facebook',
            socialId: '23242342933232323',
            avatarUrl: 'https://donkey.com/my-pictures'
          }
        };
        fetchMock.post('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', mockApiResult);
        const store = mockStore({
          global: {
            isLoading: false,
            isLoggedIn: false,
            errors: []
          }
        });
        const dispatchedActions = [
          { type: 'FACEBOOK_AUTH_REQUEST', payload: { isLoading: true } },
          { type: 'FACEBOOK_AUTH_SUCCESS', payload: { isLoading: false, isLoggedIn: true } }
        ];
        return store.dispatch(facebookAuth(data))
          .then(() => {
            const actualActions = store.getActions();
            expect(actualActions).toEqual(dispatchedActions);
            fetchMock.restore();
          });
      });
    });
  });
});
