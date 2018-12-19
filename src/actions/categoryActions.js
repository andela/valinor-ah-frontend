import { toastr } from 'react-redux-toastr';
import {
  FETCH_CATEGORY_TITLES_SUCCESS,
  FETCH_CATEGORY_TITLES_FAILURE,
} from './actionTypes';

import { globalFailure } from './globalActions';

const requestCategoryTitlesSuccess = categoryTitlesArray => ({
  type: FETCH_CATEGORY_TITLES_SUCCESS,
  payload: { categoryTitlesArray }
});

const requestCategoryTitlesFailure = error => ({
  type: FETCH_CATEGORY_TITLES_FAILURE,
  payload: { error }
});

export const fetchCategoryTitles = () => dispatch => fetch(`${process.env.API_BASE_URL}/articles/categories`)
  .then(
    res => res.json(),
    error => dispatch(globalFailure(error))
  )
  .then((categoriesResponse) => {
    if (categoriesResponse.status === 'success') {
      return dispatch(requestCategoryTitlesSuccess(categoriesResponse.categories));
    }
    toastr.error(`Failed to fetch categories... Error: ${categoriesResponse.errors.message}`);
    return dispatch(requestCategoryTitlesFailure(categoriesResponse.errors));
  });

export const dummyExport = null;
