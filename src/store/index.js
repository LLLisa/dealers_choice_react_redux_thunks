import { createStore, applyMiddleware, combineReducers } from 'redux';
import humanReducer from './human-store';
import companyReducer from './company-store';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  humans: humanReducer,
  companies: companyReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
