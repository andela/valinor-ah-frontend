import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import global from './globalReducer';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({
  global,
  toastr,
  articlesByCategory: articlesReducer
});

export default rootReducer;
