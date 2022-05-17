import { GET_PRODUCTS } from './types';

const initialState = {
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};
