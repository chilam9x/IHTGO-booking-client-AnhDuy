import axios from "axios";
import { message } from "antd";
import React from "react";
const API_URL = "http://139.180.195.15/IHTGo-Customer-homepage/api";

axios.defaults.baseURL = "https://iht-cors-server.herokuapp.com/" + API_URL;
axios.defaults.headers.common.Accept = "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(async function (config) {
  config.headers.Authorization = localStorage.getItem("@token");
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log(window.location.pathname);
      if (
        window.location.pathname !== "/signin" &&
        window.location.pathname !== ""
      ) {
        message.error(
          <>
            Phiên đăng nhập đã hết hạn, xác thực lỗi <br />
            Vui lòng đăng nhập lại
          </>
        );
        localStorage.removeItem("@token");
        window.location.href = "/signin";
      }
    }
    return error;
  }
);

export default axios;
