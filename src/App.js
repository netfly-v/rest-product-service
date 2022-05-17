import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import RegistrationPage from 'components/loginPage/RegistrationPage';
import MainPage from 'components/mainPage/MainPage';
import Menu from 'components/menu/Menu';
import { connect, Provider } from 'react-redux';
import { store } from './store';
import { getProductsThunk } from 'store/thunks/productsThunk';
import { ROUTES } from 'utils/routes';

function AppContainer({ getProducts }) {
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className={styles.content}>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path={ROUTES.HOME} element={null} />
          <Route path={ROUTES.PRODUCT_PAGE} element={<MainPage />} />
          <Route path={ROUTES.REGISTRATION_PAGE} element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = { getProducts: getProductsThunk };

const ConnectedAppContainer = connect(null, mapDispatchToProps)(AppContainer);

const App = () => (
  <Provider store={store}>
    <ConnectedAppContainer />
  </Provider>
);

export default App;
