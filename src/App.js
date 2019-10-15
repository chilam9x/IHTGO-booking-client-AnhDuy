import React, { useEffect } from "react";
import { GlobalStateProvider } from "./Store";
import "antd/dist/antd.css";
import DynamicImport from "./utils/lazyImport";
import "./utils/firebase";
import { Layout, BackTop, Affix, Tooltip } from "antd";
import RouteMap from "./Route";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "./utils/axios";

const { Content } = Layout;

const SideBar = DynamicImport(() => import("./components/templates/sideBar"));
const SignIn = DynamicImport(() => import("./components/pages/signIn"));

const App = () => {
  useEffect(() => {
    axios.post("customer/check-coupon-code", {}).then(res => {});
  }, []);

  return (
    <GlobalStateProvider>
      <Router>
        <Affix
          style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}
        >
          <Tooltip placement="bottom" title="Chinese">
            <img
              src="./img/china.png"
              height="42"
              width="42"
              onClick={() => {
                localStorage.setItem("@lang", "cn");
                window.location.reload();
              }}
            />
          </Tooltip>
        </Affix>
        <Affix
          style={{ position: "absolute", top: 5, right: 55, cursor: "pointer" }}
        >
          <Tooltip placement="bottom" title="Vietnamese">
            <img
              src="./img/vietnam.png"
              height="42"
              width="42"
              onClick={() => {
                localStorage.setItem("@lang", "vi");
                window.location.reload();
              }}
            />
          </Tooltip>
        </Affix>
        <BackTop />
        {localStorage.getItem("@token") ? (
          <Layout>
            <SideBar style={{ width: 500 }} />
            <Layout>
              <Content
                style={{
                  overflow: "initial"
                }}
              >
                <div
                  style={{
                    background: "#fff"
                  }}
                >
                  <RouteMap />
                </div>
              </Content>
            </Layout>
          </Layout>
        ) : (
          <SignIn />
        )}
      </Router>
    </GlobalStateProvider>
  );
};

export default App;
