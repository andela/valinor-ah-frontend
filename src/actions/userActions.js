import { toastr } from 'react-redux-toastr';
import { REGISTER_SUCCESS } from './actionTypes';
import requestOptions from '../utils/requestOptions';
import { globalLoading, globalLoggedIn, globalFailure } from './globalActions';

const success = userData => ({ type: REGISTER_SUCCESS, userData });

export const register = (user, history) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/users/signup`, requestOptions(user, 'POST', null))
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
        dispatch(globalLoading(false));
      } else {
        const { userData } = dispatch(success(body));
        toastr.success(userData.status, userData.message);
        history.push('/');
        dispatch(globalLoading(false));
      }
    });
};

export const verifyUser = token => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/users/verify`, requestOptions(null, 'GET', token))
    .then(res => res.json())
    .then((res) => {
      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        dispatch(globalLoading(false));
        toastr.success(res.status, res.message);
        return dispatch(globalLoggedIn(true));
      }
      localStorage.removeItem('user');
      dispatch(globalFailure(res.errors));
      dispatch(globalLoading(false));
    });
};
