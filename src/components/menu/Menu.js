import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { authSelector } from 'store/state/auth/selectors';
import { productsSelector } from 'store/state/products/selectors';
import { logoutThunk } from 'store/thunks/authThunk';
import styles from './Menu.module.css';

const Menu = ({ products, authUser, logout }) => {
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
          <button className={styles.login} onClick={logout}>
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

const mapStateToProps = state => ({
  authUser: authSelector(state),
  products: productsSelector(state)
});

const mapDispatchToProps = { logout: logoutThunk };

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
