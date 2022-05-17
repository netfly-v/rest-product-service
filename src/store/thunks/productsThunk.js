import { productsAPI } from 'api/products';
import { getProducts } from 'store/state/products/actions';

export const getProductsThunk = () => dispatch => {
  productsAPI.get().then(products => dispatch(getProducts(products)));
};
