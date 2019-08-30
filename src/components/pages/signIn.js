import React, { useState, useEffect } from "react";
import { Tabs, Affix } from "antd";
import DynamicImport from "../../utils/lazyImport";

const SignInForm = DynamicImport(() => import("../templates/signInForm"));
const SignUp = DynamicImport(() => import("../templates/signUpForm"));
const { TabPane } = Tabs;

const SignIn = props => {
  const [state, setState] = useState({
    loading: false,
    signin: true
  });

  useEffect(() => {
    if (localStorage.getItem("@token")) window.location.replace("/");
  }, []);

  const backToLogin = () => {
    setState({
      ...state,
      signin: true
    });
  };

  return (
    <div
      style={{
        height: window.innerHeight,
        backgroundImage: `url("https://ihtgo.com.vn/public/Images/FileUpload/images/TrangChu/index_banner.jpg")`
      }}
    >
      <Affix
        style={{
          position: "absolute",
          top: 50,
          left: "20%",
          height: state.signin ? "35%" : "60%",
          background: "white",
          padding: 20,
          borderRadius: 5,
          boxShadow: "0 10px 50px 0 rgba(0, 0, 0, 0.5)"
        }}
      >
        <Tabs
          style={{
            width: 400,
            background: "white"
          }}
          onChange={() => {
            setState({
              ...state,
              signin: !state.signin
            });
          }}
          activeKey={state.signin ? "1" : "2"}
        >
          <TabPane tab="Đăng nhập" key="1">
            <SignInForm />
          </TabPane>
          <TabPane tab="Đăng ký" key="2">
            <SignUp back={backToLogin} />
          </TabPane>
        </Tabs>
      </Affix>
    </div>
  );
};

export default SignIn;
