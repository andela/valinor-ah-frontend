import { toastr } from 'react-redux-toastr';
import {
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  FETCH_POPULAR_SUCCESS,
  FETCH_POPULAR_FAILURE
} from './actionTypes';
import { globalLoading, globalFailure } from './globalActions';

const requestCategorySuccess = (categoryName, articles) => ({
  type: FETCH_CATEGORY_SUCCESS,
  categoryName,
  payload: { articles },
});

const requestCategoryFailure = (categoryName, error) => ({
  type: FETCH_CATEGORY_FAILURE,
  categoryName,
  payload: { error }
});

const requestPopularSuccess = articles => ({
  type: FETCH_POPULAR_SUCCESS,
  payload: { articles }
});

const requestPopularFailure = error => ({
  type: FETCH_POPULAR_FAILURE,
  payload: { error }
});

export const fetchCategory = categoryName => (dispatch) => {
  // dispatch global action to set state to laoding
  dispatch(globalLoading(true));

  // make fetch request
  return fetch(`${process.env.API_BASE_URL}/articles/category/${categoryName}`)
    .then(
      res => res.json(),
      error => dispatch(globalFailure(error))
    )
    .then((category) => {
      if (category.errors) {
        // an error has occurred
        dispatch(requestCategoryFailure(categoryName, category.errors));
        toastr.error(`Failed to fetch category ${categoryName}. Error: ${category.errors.message}`);
      }

      if (category.articles) {
        // category successfully fetched
        dispatch(requestCategorySuccess(categoryName, category.articles));
      }

      // dispatch global action to set loading state to false
      dispatch(globalLoading(false));
    });
};

export const fetchPopularPosts = () => (dispatch) => {
  // dispatch global action to set loading state to true
  dispatch(globalLoading(true));

  // make fetch request
  return fetch(`${process.env.API_BASE_URL}/articles/popular`)
    .then(
      res => res.json(),
      error => dispatch(globalFailure(error))
    )
    .then((response) => {
      if (response.errors) {
        // an error has occurred
        dispatch(requestPopularFailure(response.errors));
        toastr.error(`Failed to fetch popular article with error: ${response.errors.message}`);
      }

      if (response.articles) {
        // popular post successfully fetched
        dispatch(requestPopularSuccess(response.articles));
      }

      // dispatch global action to set loading state to false
      dispatch(globalLoading(false));
    });
};
