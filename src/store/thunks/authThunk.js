import { authAPI } from 'api/auth';
import { authAction, logoutAction, setErrorAction } from 'store/state/auth/actions';
import { auth } from 'utils/auth';

export const authThunk =
  ({ URL, login, password }) =>
  dispatch => {
    authAPI
      .auth(URL, login, password)
      .then(data => {
        dispatch(authAction({ login, token: data.token }));
        auth.set({ token: data.token, login });
        dispatch(setErrorAction(''));
      })
      .catch(error => {
        auth.delete();
        dispatch(setErrorAction(error.message));
      });
  };

export const logoutThunk = () => dispatch => {
  auth.delete();
  dispatch(logoutAction({}));
};
