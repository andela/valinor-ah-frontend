import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import singleArticleReducer from './singleArticleReducer';

import global from './globalReducer';
import articlesReducer from './articlesReducer';
import popularPostsReducer from './popularPostsReducer';
import categoryReducer from './categoryReducer';
import tagReducer from './tagReducer';
import postArticleReducer from './postArticleReducer';
import searchReducer from './searchReducer';
import authorReducer from './authorReducer';
import bookmarksReducer from './bookmarksReducer';

const rootReducer = combineReducers({
  articlesByCategory: articlesReducer,
  article: singleArticleReducer,
  authors: authorReducer,
  categoryTitles: categoryReducer,
  global,
  popularArticles: popularPostsReducer,
  postArticle: postArticleReducer,
  searchResults: searchReducer,
  tagTitles: tagReducer,
  toastr,
  bookmarks: bookmarksReducer
});

export default rootReducer;
