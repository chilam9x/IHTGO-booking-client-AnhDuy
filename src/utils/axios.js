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
    console.log("err", error);
    if (error.response && error.response.status === 401) {
      window.location.href = "/signin";
    }
    return error;
  }
);

export default axios;
