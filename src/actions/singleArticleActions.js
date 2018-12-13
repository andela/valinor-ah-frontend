import { toastr } from 'react-redux-toastr';
import * as types from './actionTypes';
import { globalLoading, globalFailure } from './globalActions';


const receiveArticleSuccess = (articleId, response) => ({
  type: types.RECEIVE_ARTICLE_SUCCESS,
  articleId,
  item: response
});


const fetchArticle = articleId => (dispatch) => {
  dispatch(globalLoading(true));
  return fetch(`${process.env.API_BASE_URL}/articles/${articleId}`)
    .then(res => res.json())
    .then((body) => {
      if (body.errors) {
        dispatch(globalFailure(body.errors));
        toastr.error(body.status.toUpperCase(), body.errors.message[0]);
      } else {
        dispatch(globalLoading(false));
        dispatch(receiveArticleSuccess(articleId, body));
      }
    });
};

export default fetchArticle;
