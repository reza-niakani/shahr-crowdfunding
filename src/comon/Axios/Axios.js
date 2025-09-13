/* eslint-disable no-unused-vars */
import axios from 'axios';
import { getFromLocalStorage, removeFromLocalStorage } from 'comon/storage/localStorage';
import getBaseUrl from './getBaseUrl';

let token = JSON.parse(getFromLocalStorage('token'));
const baseUrl = getBaseUrl();

const Axios = axios.create({
  baseURL: baseUrl, // Replace with your API base URL
  timeout: 40000, // Set a timeout (optional)
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer  ${token}`
  }
});

// config for request before send
// Axios.interceptors.request.use(
//   (config) => {
//     // Do something before request is sent
//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

Axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    console.log('main error ', error);
    if (error.response) {
      if (error.response.status == 401) {
        window.location = '/';
        removeFromLocalStorage('token');
        return false;
      } else if (error.response.status == 404) {
        return false;
      } // Add other status code handling if needed
    } else if (error.request) {
      // Request made but no response received
      return false;
    } else {
      // Something happened in setting up the request
      return false;
    }
    return Promise.reject(error);
  }
);

export default Axios;
