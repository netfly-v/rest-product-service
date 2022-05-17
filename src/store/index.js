import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { authReducer} from './state/auth';
import { productsReducer } from './state/products';


//domain не добавляется это сделано для удобства здесь
const reducers = combineReducers({
  authDomain: authReducer,
  productsDomain: productsReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));
