import React, { useState, useEffect } from "react";
import { Tabs, Affix } from "antd";
import DynamicImport from "../../utils/lazyImport";
import languages from "../../utils/languages";
const Lang = languages("login");
const SignInForm = DynamicImport(() => import("../templates/signInForm"));
const SignUp = DynamicImport(() => import("../templates/signUpForm"));
const ForgotPassword = DynamicImport(() =>
  import("../templates/forgotPasswordForm")
);
const { TabPane } = Tabs;
const lang = localStorage.getItem("@lang")
  ? localStorage.getItem("@lang")
  : "vi";
const SignIn = props => {
  const [state, setState] = useState({
    loading: false,
    signin: "1"
  });

  useEffect(() => {
    if (localStorage.getItem("@token")) window.location.replace("/");
  }, []);

  const backToLogin = () => {
    setState({
      ...state,
      signin: "1"
    });
  };

  return (
    <div
      style={{
        height: window.innerHeight,
        backgroundImage:
          lang == "vi"
            ? `url("https://ihtgo.com.vn/public/Images/FileUpload/images/TrangChu/index_banner.jpg")`
            : `url("../img/china_banner.jpg")`
      }}
    >
      <Affix
        style={{
          position: "absolute",
          top: 50,
          left: "20%",
          height: state.signin === "1" ? "35%" : "60%",
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
          onChange={activeKey => {
            setState({
              ...state,
              signin: activeKey
            });
          }}
          activeKey={state.signin}
        >
          <TabPane tab={Lang.signin} key="1">
            <SignInForm />
          </TabPane>
          <TabPane tab={Lang.signup} key="2">
            <SignUp back={backToLogin} />
          </TabPane>
          <TabPane tab={Lang.forgot} key="3">
            <ForgotPassword back={backToLogin} />
          </TabPane>
        </Tabs>
      </Affix>
    </div>
  );
};

export default SignIn;
