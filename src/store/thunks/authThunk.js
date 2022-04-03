import axios from 'axios';
import { addNews } from '../state/news/actions';

export const addNewsAction = () => dispatch => {
  axios
    .get('https://newsapi.org/v2/top-headlines?country=ua&apiKey=9e57f68aa46441be9f2cd43e8e6a4fdb')
    .then(response => dispatch(addNews(response.data.articles)));
};
