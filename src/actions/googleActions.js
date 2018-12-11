import { toastr } from 'react-redux-toastr';

import { globalLoading, globalFailure, globalLoggedIn } from './globalActions';
import requestOptions from '../utils/requestOptions';

const socialLogin = userObject => dispatch => fetch(`${process.env.API_BASE_URL}/auth/social`, requestOptions(userObject, 'POST', null))
  .then(
    res => res.json(),
    (error) => {
      dispatch(globalFailure(['An error has occured', error]));
      toastr.error('An error has occured, please try again!');
    }
  )
  .then((response) => {
    dispatch(globalLoading(false));
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      toastr.success('Welcome to Author\'s Haven!');
      return dispatch(globalLoggedIn(true));
    }
    localStorage.removeItem('user');
    toastr.error('An error has occured, please try again!');
    return dispatch(globalFailure([response.errors]));
  });

export default socialLogin;
