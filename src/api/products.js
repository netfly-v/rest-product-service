import axios from 'axios';

export const productsAPI = {
  get() {
    return axios.get('https://smktesting.herokuapp.com/api/products/').then(response => response.data);
  },
};
