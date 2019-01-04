import { globalLoading } from './globalActions';
import {
  FETCH_USER_BOOKMARKS_FAILURE,
  FETCH_USER_BOOKMARKS_SUCCESS,
  BOOKMARK_ARTICLE_SUCCESS,
  UNBOOKMARK_ARTICLE_SUCCESS,
  BOOKMARK_ARTICLE_FAILURE
} from './actionTypes';
import getToken from '../utils/getToken';
import requestOptions from '../utils/requestOptions';

export const fetchBookmarkedSuccess = data => ({
  type: FETCH_USER_BOOKMARKS_SUCCESS,
  payload: data
});

export const fetchBookmarkedFailure = errors => ({
  type: FETCH_USER_BOOKMARKS_FAILURE,
  payload: { errors }
});

export const bookmarkArticleSuccess = data => ({
  type: BOOKMARK_ARTICLE_SUCCESS,
  payload: data
});

export const unbookmarkArticleSuccess = data => ({
  type: UNBOOKMARK_ARTICLE_SUCCESS,
  payload: data
});

export const bookmarkArticleFailure = errors => ({
  type: BOOKMARK_ARTICLE_FAILURE,
  payload: { errors }
});

export const fetchUserBookmarks = () => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/users/bookmarks`, requestOptions('', 'GET', getToken()))
    .then(res => res.json(), err => dispatch(fetchBookmarkedFailure(err)))
    .then((data) => {
      dispatch(globalLoading(false));
      if (data.status === 'success') return dispatch(fetchBookmarkedSuccess(data));
      if (data.errors) return dispatch(fetchBookmarkedFailure(data.errors));
    });
};

export const bookmarkArticle = articleId => dispatch => fetch(
  `${process.env.API_BASE_URL}/users/bookmarks/${articleId}`,
  requestOptions('', 'POST', getToken())
)
  .then(res => res.json(), err => dispatch(bookmarkArticleFailure(err)))
  .then((data) => {
    if (data.bookmarkStatus) return dispatch(bookmarkArticleSuccess(data));
    if (data.bookmarkStatus === false) return dispatch(unbookmarkArticleSuccess(data));
    if (data.errors) return dispatch(bookmarkArticleFailure(data.errors));
  });
