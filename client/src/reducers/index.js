import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import stockReducer from './stockReducer';
import personReducer from './personReducer';

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams:streamReducer,
  persons:personReducer,
  stocks:stockReducer
});
