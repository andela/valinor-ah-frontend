import { toastr } from 'react-redux-toastr';
import { globalLoading, globalFailure } from './globalActions';
import fetchArticle from './singleArticleActions';
import requestOptions from '../utils/requestOptions';
import getToken from '../utils/getToken';

export const postComment = (articleId, commentBody) => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(
    `${process.env.API_BASE_URL}/articles/${articleId}/comments`,
    requestOptions(commentBody, 'POST', getToken())
  ).then(
    res => res.json(),
    error => dispatch(globalFailure(error))
  ).then((commentResponse) => {
    if (commentResponse.status === 'success') {
      // successfully posted article
      toastr.success(commentResponse.message);
      dispatch(fetchArticle(articleId));
    }
    if (commentResponse.status === 'unauthorized') {
      // no token provided or invalid token
      toastr.error('Sorry, you need to relogin to perform that action', 'Unauthorized');
    }
    if (commentResponse.errors) {
      // invalid body
      toastr.error('Failed to post comment...', commentResponse.errors.body[0]);
    }
    dispatch(globalLoading(false));
  });
};

export const dummyExport = null;
