import styles from './RegistrationPage.module.css';
import axios from 'axios';
import { useState } from 'react';
import { auth } from 'utils/auth';

export const RegistrationPage = ({ authUser, setAuthUser }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [clientError, setClientError] = useState('');

  const URL = error ? 'https://smktesting.herokuapp.com/api/login/' : 'https://smktesting.herokuapp.com/api/register/';

  const authenticate = e => {
    e.preventDefault();

    if (login === '') {
      setClientError('Login required');
      if (password === '') {
        setClientError('Pass required');
      }
      return;
    }

    axios
      .post(URL, {
        username: login,
        password,
      })
      .then(response => {
        if (response.data.success) {
          setAuthUser({ login, token: response.data.token });
          auth.set({ token: response.data.token, login });
        } else {
          auth.delete();
          setError(response.data.message);
        }
      });
  };

  return !authUser.login ? (
    <form onSubmit={authenticate}>
      <div className={styles.loginPage}>
        <p className={styles.registration}>Registration</p>
        <div className={styles.auth}>
          <span>Login: </span>
          <input
            className={styles.loginInput}
            onChange={({ target }) => {
              setLogin(target.value);
            }}
          />
        </div>

        <div className={styles.auth}>
          <span>Pass: </span>
          <input
            className={styles.passInput}
            type="password"
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>

        <button type="submit" className={styles.registerButton}>
          {error ? 'Login' : 'Register user'}
        </button>

        {clientError ? <p className={styles.error}>{clientError}</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
    </form>
  ) : (
    <p className={styles.successMessage}>User successfully registered, token is {authUser.token}</p>
  );
};
