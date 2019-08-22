import axios from "axios";

const API_URL = "https://ihtgo.com.vn/api/";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common.Accept = "application/x-www-form-urlencoded";

axios.interceptors.request.use(async function(config) {
  config.headers.Authorization = localStorage.getItem("@token");
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      window.location.href = "/signin";
    }
    return error;
  }
);

export default axios;
