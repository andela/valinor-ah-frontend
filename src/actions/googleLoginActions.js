import * as types from './actionTypes';

const request = () => ({
  type: types.GOOGLE_LOGIN_REQUEST,
  isLoading: true,
  isLoggedIn: false,
});
const success = () => ({
  type: types.GOOGLE_LOGIN_SUCCESS,
  isLoading: false,
  isLoggedIn: true,
});
const failure = () => ({
  type: types.GOOGLE_LOGIN_FAILURE,
  isLoading: false,
  isLoggedIn: false,
});

export const onRequestClick = () => dispatch => dispatch(request());

export const onFailureClick = () => dispatch => dispatch(failure());

const socialLogin = userObject => dispatch => fetch('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify(userObject)
})
  .then(res => res.json())
  .then((res) => {
    if (res.user.token) {
      localStorage.setItem('user', JSON.stringify(res.user));
      return dispatch(success());
    }
    localStorage.removeItem('user');
    return dispatch(failure());
  });

export default socialLogin;
