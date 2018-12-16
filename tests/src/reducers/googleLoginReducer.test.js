import googleLoginReducer from '../../../src/reducers/googleLoginReducer';
import * as types from '../../../src/actions/actionTypes';

const initialState = {
  global: {
    isLoading: false,
    isLoggedIn: false
  }
};

describe('googleLoginReducer', () => {
  it('should return the initial state', () => {
    expect(googleLoginReducer(initialState, {})).toEqual(initialState);
  });

  it('should return isLoading false, isLoggedIn true', () => {
    expect(googleLoginReducer(
      initialState,
      {
        type: types.GOOGLE_LOGIN_SUCCESS,
        isLoading: false,
        isLoggedIn: true
      }
    )).toEqual({
      global: {
        isLoading: false,
        isLoggedIn: true
      }
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(googleLoginReducer(
      initialState,
      {
        type: types.GOOGLE_LOGIN_FAILURE,
        isLoading: false,
        isLoggedIn: false
      }
    )).toEqual({
      global: {
        isLoading: false,
        isLoggedIn: false
      }
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(googleLoginReducer(
      initialState,
      {
        type: types.GOOGLE_LOGIN_REQUEST,
        isLoading: true,
        isLoggedIn: false
      }
    )).toEqual({
      global: {
        isLoading: true,
        isLoggedIn: false
      }
    });
  });
});
