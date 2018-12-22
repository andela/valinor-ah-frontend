import initialState from '../store/initialState';
import { RECEIVE_ARTICLE_SUCCESS } from '../actions/actionTypes';


const { article } = initialState;
const singleArticleReducer = (state = article, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_ARTICLE_SUCCESS:
      return {
        ...state,
        item: action.item.article
      };
    default:
      return state;
  }
};

export default singleArticleReducer;
