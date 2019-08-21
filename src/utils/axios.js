import axios from "axios";

const API_URL = "https://go.ihtvn.com/api/";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = "application/x-www-form-urlencoded";

axios.interceptors.request.use(async function(config) {
  config.headers.Authorization = localStorage.getItem("@token");
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default axios;
