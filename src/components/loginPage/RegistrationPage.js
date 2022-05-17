import styles from './RegistrationPage.module.css';
import { useState } from 'react';
import { loginURL, registerURL } from 'utils/constants';
import { connect } from 'react-redux';
import { authThunk } from 'store/thunks/authThunk';
import { authSelector, errorSelector } from 'store/state/auth/selectors';

const RegistrationPage = ({ authUser, authenticate, error }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [clientError, setClientError] = useState('');

  const URL = error ? loginURL : registerURL;

  const submitAuth = e => {
    e.preventDefault();

    if (login === '') {
      setClientError('Login required');
      if (password === '') {
        setClientError('Pass required');
      }
      return;
    }

    authenticate({ URL, login, password });
  };

  return !authUser.login ? (
    <form onSubmit={submitAuth}>
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

const mapStateToProps = state => ({
  authUser: authSelector(state),
  error: errorSelector(state)
});

const mapDispatchToProps = { authenticate: authThunk };

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
