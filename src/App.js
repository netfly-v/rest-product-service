import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { RegistrationPage } from 'components/loginPage/RegistrationPage';
import { MainPage } from 'components/mainPage/MainPage';
import { Menu } from 'components/menu/Menu';
import { auth } from 'utils/auth';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [products, setProducts] = useState();
  const [authUser, setAuthUser] = useState(auth.get() ? auth.get() : {});

  useEffect(() => {
    axios.get('https://smktesting.herokuapp.com/api/products/').then(response => setProducts(response.data));
  }, []);

  return (
    <Provider store={store}>
    <div className={styles.content}>
      <BrowserRouter>
        <Menu products={products} authUser={authUser} setAuthUser={setAuthUser} />
        <Routes>
          <Route path="/" element={null} />
          <Route path="/product/:productId" element={<MainPage products={products} />} />
          <Route path="/registrationPage" element={<RegistrationPage authUser={authUser} setAuthUser={setAuthUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;
