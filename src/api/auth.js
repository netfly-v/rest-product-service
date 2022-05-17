import axios from 'axios';

export const authAPI = {
  auth(URL, login, password) {
    return axios
      .post(URL, {
        username: login,
        password,
      })
      .then(response => {
        if (!response.data.success) {
          throw Error(response.data.message);
        }
        return response.data;
      });
  },
};
