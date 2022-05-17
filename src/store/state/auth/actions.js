import { AUTH, LOGOUT, SET_ERROR } from './types';

export const authAction = auth => ({ type: AUTH, auth });
export const logoutAction = auth => ({ type: LOGOUT, auth });
export const setErrorAction = error => ({ type: SET_ERROR, error });