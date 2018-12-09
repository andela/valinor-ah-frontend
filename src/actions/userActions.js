import toastr from 'toastr';
import * as types from './actionTypes';

// user facebook auth actions
export const facebookAuthRequest = () => (
  { type: types.FACEBOOK_AUTH_REQUEST, payload: { isLoading: true } }
);

export const facebookAuthSuccess = () => (
  { type: types.FACEBOOK_AUTH_SUCCESS, payload: { isLoading: false, isLoggedIn: true } }
);

export const facebookAuthFailure = error => (
  {
    type: types.FACEBOOK_AUTH_FAILURE,
    payload: { isLoading: false, isLoggedIn: false, errors: [error] }
  }
);

export const facebookAuth = data => (dispatch) => {
  const facebookName = data.name.toString().split(' ');
  if (facebookName.length > 2) facebookName.pop();
  const fullName = facebookName.join(' ');
  dispatch(facebookAuthRequest());
  return fetch('https://valinor-ah-backend-staging.herokuapp.com/api/v1/auth/social', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      fullName,
      email: data.email,
      socialType: 'facebook',
      socialId: data.userID,
      avatarUrl: data.picture.data.url
    })
  })
    .then(response => response.json(), (error) => {
      dispatch(facebookAuthFailure(error));
      toastr.error('Something went wrong. try again');
    })
    .then((userData) => {
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(facebookAuthSuccess());
        toastr.success('Facebook Authentication was successful');
      }
    });
};
