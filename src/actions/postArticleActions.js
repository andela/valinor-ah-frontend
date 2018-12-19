import { toastr } from 'react-redux-toastr';
import { globalLoading, globalFailure } from './globalActions';
import requestOptions from '../utils/requestOptions';
import {
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE,
} from './actionTypes';
import getToken from '../utils/getToken';

const postArticleSuccess = article => ({
  type: POST_ARTICLE_SUCCESS,
  payload: article
});

const postArticleFailure = errors => ({
  type: POST_ARTICLE_FAILURE,
  payload: { errors }
});

export const postArticle = (article, history) => (dispatch) => {
  dispatch(globalLoading(true));
  const token = getToken();
  return fetch(
    `${process.env.API_BASE_URL}/articles`,
    requestOptions(article, 'POST', token)
  ).then(
    res => res.json(),
    error => dispatch(globalFailure(error))
  ).then((postArticleResponse) => {
    if (postArticleResponse.status === 'success') {
      toastr.success(postArticleResponse.message);
      dispatch(postArticleSuccess(postArticleResponse.article));
      history.push(`/articles/${postArticleResponse.article.id}`);
    }
    if (postArticleResponse.status === 'unauthorized') {
      toastr.error(`Failed to post article... Error: ${postArticleResponse.message}`);
    }
    if (postArticleResponse.errors) {
      toastr.error('Failed to post article...', postArticleResponse.errors.message);
      dispatch(postArticleFailure(postArticleResponse.errors));
    }
    return dispatch(globalLoading(false));
  });
};

export const dummyExport = null;
