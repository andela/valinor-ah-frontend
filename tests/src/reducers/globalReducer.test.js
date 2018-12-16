import globalReducer from '../../../src/reducers/globalReducer';
import {
  TRIGGER_LOGGEDIN,
  TRIGGER_FAILURE,
  TRIGGER_LOADING
} from '../../../src/actions/actionTypes';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  error: []
};

describe('globalReducer', () => {
  it('should return the initial state', () => {
    expect(globalReducer(initialState, {})).toEqual(initialState);
  });

  it('should return isLoading false, isLoggedIn true', () => {
    expect(globalReducer(
      initialState,
      {
        type: TRIGGER_LOGGEDIN,
        isLoading: false,
        isLoggedIn: true,
        error: []
      }
    )).toEqual({
      isLoading: false,
      isLoggedIn: true,
      error: []
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(globalReducer(
      initialState,
      {
        type: TRIGGER_FAILURE,
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    )).toEqual({
      isLoading: false,
      isLoggedIn: false,
      error: [[]]
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(globalReducer(
      initialState,
      {
        type: TRIGGER_LOADING,
        isLoading: true,
        isLoggedIn: false,
        error: [],
      }
    )).toEqual({
      isLoading: true,
      isLoggedIn: false,
      error: []
    });
  });

  it('should return isLoading false, isLoggedIn false', () => {
    expect(globalReducer(
      initialState,
      {
        type: TRIGGER_LOGGEDIN,
        isLoading: false,
        isLoggedIn: false,
        error: [],
      }
    )).toEqual({
      isLoading: false,
      isLoggedIn: false,
      error: []
    });
  });
});
