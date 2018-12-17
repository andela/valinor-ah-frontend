import { toastr } from 'react-redux-toastr';

import { globalLoading, globalFailure, globalLoggedIn } from './globalActions';
import requestOptions from '../utils/requestOptions';

export const sendEmailLink = email => dispatch => fetch(
  `${process.env.API_BASE_URL}/users/login`, requestOptions({ email }, 'POST', null)
)
  .then(
    res => res.json(),
    error => dispatch(globalFailure(['An error has occured', error]))
  )
  .then((jsonResponse) => {
    if (jsonResponse.errors) {
      dispatch(globalFailure(jsonResponse.errors));
      toastr.error('The email you have submitted does not exist. Check your email and try again.');
    } else {
      toastr.success('Email sent successfully! Check your email.');
    }
  });

export const logUserIn = tokenQueryString => dispatch => fetch(
  `${process.env.API_BASE_URL}/users/login${tokenQueryString}`
)
  .then(res => res.json(), error => dispatch(
    globalFailure(['We were unable to log you in, please try again.', error])
  ))
  .then((jsonResponse) => {
    dispatch(globalLoading(true));
    if (jsonResponse.user) {
      localStorage.setItem('user', JSON.stringify(jsonResponse.user));
      dispatch(globalLoading(false));
      toastr.success('Login was was successful');
      return dispatch(globalLoggedIn(true));
    }
    localStorage.removeItem('user');
    // toastr.error('An error has occured, please try again!');
    dispatch(globalFailure(jsonResponse.errors));
  });
