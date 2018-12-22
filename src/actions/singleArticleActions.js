import { toastr } from 'react-redux-toastr';
import { RECEIVE_ARTICLE_SUCCESS } from './actionTypes';
import { globalLoading, globalFailure } from './globalActions';

const receiveArticleSuccess = response => ({
  type: RECEIVE_ARTICLE_SUCCESS,
  item: response
});

const fetchArticle = articleId => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/articles/${articleId}`)
    .then(
      res => res.json(),
      error => dispatch(globalFailure(error))
    )
    .then((body) => {
      if (body.status === 'success') {
        dispatch(receiveArticleSuccess(body));
        return dispatch(globalLoading(false));
      }
      toastr.error(body.status.toUpperCase(), body.errors.message[0]);
      return dispatch(globalFailure(body.errors));
    });
};

export default fetchArticle;
