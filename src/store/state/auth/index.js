import { ADD_NEWS } from './types';

const initialState = {
  news: [],
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEWS:
      return { ...state, news: action.news };

    default:
      return state;
  }
};
