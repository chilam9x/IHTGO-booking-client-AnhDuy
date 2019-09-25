import React, { useEffect } from "react";
import { GlobalStateProvider } from "./Store";
import "antd/dist/antd.css";
import DynamicImport from "./utils/lazyImport";
import "./utils/firebase";
import { Layout, BackTop } from "antd";
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
