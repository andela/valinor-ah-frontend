import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE } from './actionTypes';

const requestCategory = categoryName => ({
  type: FETCH_CATEGORY_REQUEST,
  categoryName
});

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

export const fetchCategory = categoryName => (dispatch) => {
  // dispatch category request
  dispatch(requestCategory(categoryName));
  // make fetch request
  return fetch(`${process.env.API_BASE_URL}/articles/category/${categoryName}`)
    .then(res => res.json())
    .then((category) => {
      // console.log(category);
      if (category.errors) {
        dispatch(requestCategoryFailure(categoryName, category.errors));
      } else {
        dispatch(requestCategorySuccess(categoryName, category.articles));
      }
    });
};

export const i = null;
