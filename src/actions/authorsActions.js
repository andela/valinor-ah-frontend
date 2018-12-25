import {
  FETCH_AUTHORS_SUCCESS,
  FETCH_AUTHORS_FAILURE,
} from './actionTypes';

import { globalFailure } from './globalActions';

export const requestAuthorsSuccess = results => ({
  type: FETCH_AUTHORS_SUCCESS,
  results,
  errors: {}
});

export const requestAuthorsFailure = errors => ({
  type: FETCH_AUTHORS_FAILURE,
  errors,
  results: []
});

const fetchAuthors = () => dispatch => fetch(`${process.env.API_BASE_URL}/users/authors`)
  .then(
    res => res.json(),
    error => dispatch(globalFailure(error))
  )
  .then((authors) => {
    if (authors.status === 'failure') {
      return dispatch(requestAuthorsFailure(authors.errors.message));
    }
    return dispatch(requestAuthorsSuccess(authors.authors));
  });

export default fetchAuthors;
