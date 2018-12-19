import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import singleArticleReducer from './singleArticleReducer';

import global from './globalReducer';
import articlesReducer from './articlesReducer';
import popularPostsReducer from './popularPostsReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';
import postArticleReducer from './postArticleReducer';

const rootReducer = combineReducers({
  global,
  toastr,
  articlesByCategory: articlesReducer,
  popularArticles: popularPostsReducer,
  article: singleArticleReducer,
  categoryTitles: categoryReducer,
  tagTitles: tagReducer,
  postArticle: postArticleReducer,
});

export default rootReducer;
