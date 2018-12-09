import globalReducer from '../../../src/reducers/globalReducer';

describe('GLOBAL REDUCER TEST', () => {
  test('global reducer should change loading status to true on fb request action', () => {
    const initialState = {
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    };
    const newState = {
      global: {
        isLoading: true,
        isLoggedIn: false
      }
    };
    expect(globalReducer(
      initialState.global,
      {
        type: 'FACEBOOK_AUTH_REQUEST',
        payload: {
          isLoading: true
        }
      }
    ))
      .toEqual(newState.global);
  });
  test(`facebook auth failure action should
   update store to new state`, () => {
    const initialState = {
      global: {
        isLoading: true,
        isLoggedIn: false,
        errors: []
      }
    };
    const newState = {
      global: {
        isLoading: false,
        isLoggedIn: false,
        errors: ['app crashed']
      }
    };
    expect(globalReducer(
      initialState.global,
      {
        type: 'FACEBOOK_AUTH_FAILURE',
        payload: {
          isLoading: false,
          isLoggedIn: false,
          errors: ['app crashed']
        }
      }
    ))
      .toEqual(newState.global);
  });

  test(`facebook auth  action should
   update store to new state`, () => {
    const initialState = {
      global: {
        isLoading: true,
        isLoggedIn: false,
        errors: []
      }
    };
    const newState = {
      global: {
        isLoading: false,
        isLoggedIn: true,
        errors: []
      }
    };
    expect(globalReducer(
      initialState.global,
      {
        type: 'FACEBOOK_AUTH_SUCCESS',
        payload: {
          isLoading: false,
          isLoggedIn: true,
          errors: []
        }
      }
    ))
      .toEqual(newState.global);
  });
});
