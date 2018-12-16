import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';

import global from './globalReducer';

const rootReducer = combineReducers({
  global,
  toastr
});

export default rootReducer;
