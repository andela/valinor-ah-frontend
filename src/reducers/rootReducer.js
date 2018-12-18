import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import global from './globalReducer';
import articlesReducer from './articlesReducer';
import popularPostsReducer from './popularPostsReducer';

const rootReducer = combineReducers({
  global,
  toastr,
  articlesByCategory: articlesReducer,
  popularArticles: popularPostsReducer,
});

export default rootReducer;
