import { auth } from 'utils/auth';
import { AUTH, LOGOUT, SET_ERROR } from './types';

const initialState = {
  auth: auth.get() ? auth.get() : {},
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, auth: action.auth };
    case LOGOUT:
      return { ...state, auth: action.auth };
    case SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
