import axios from 'axios';

export const reviewsAPI = {
  getReviews(productId) {
    return axios.get(`https://smktesting.herokuapp.com/api/reviews/${productId}`).then(response => response.data);
  },
  postReview(productId, data, config) {
    return axios.post(`https://smktesting.herokuapp.com/api/reviews/${productId}`, data, config);
  },
};
