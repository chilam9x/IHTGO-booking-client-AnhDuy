import axios from "axios";

const API_URL = "https://ihtgo.com.vn/api/";

axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/" + API_URL;
axios.defaults.headers.common.Accept = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(async function(config) {
  config.headers.Authorization = localStorage.getItem("@token");
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== "/signin") {
        window.location.href = "/signin";
        localStorage.removeItem("@token");
      }
    }
    return error;
  }
);

export default axios;
