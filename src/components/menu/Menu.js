import { NavLink } from 'react-router-dom';
import { storage } from 'utils/localStorage';
import styles from './Menu.module.css';

export const Menu = ({ products, authUser, setAuthUser }) => {
  return (
    <div className={styles.header}>
      <ul className={styles.products}>
        <li className={styles.product}>
          <NavLink to="/" className={styles.NavLink}>
            Main Page
          </NavLink>
        </li>
        {products
          ? products.map(product => (
              <li className={styles.product} key={product.id}>
                <NavLink to={`/product/${product.id}`} className={styles.NavLink}>
                  {product.title}
                </NavLink>
              </li>
            ))
          : null}
      </ul>
      {authUser.login ? (
        <>
          <span className={styles.loginOk}>Hello, {authUser.login}</span>
          <button className={styles.login}
            onClick={() => {
              storage.set('auth', '');
              setAuthUser({});
            }}
          >
            Exit
          </button>
        </>
      ) : (
        <NavLink to="/registrationPage" className={styles.NavLinkLoginButton}>
          <button className={styles.login}>login</button>
        </NavLink>
      )}
    </div>
  );
};
