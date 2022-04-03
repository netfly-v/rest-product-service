import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { newsReducer } from './state/auth';

const reducers = combineReducers({
  auth: authReducer,
});

export const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));
