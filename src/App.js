import React from "react";
import { GlobalStateProvider } from "./Store";
import "antd/dist/antd.css";
import DynamicImport from "./utils/lazyImport";
import "./utils/firebase";
import { Layout, BackTop } from "antd";
import RouteMap from "./Route";
import { BrowserRouter as Router } from "react-router-dom";

const { Content } = Layout;

const SideBar = DynamicImport(() => import("./components/templates/sideBar"));
const SignIn = DynamicImport(() => import("./components/pages/signIn"));

const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        <BackTop />
        {console.log(localStorage.getItem("user_info"))}
        {localStorage.getItem("user_info") ? (
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
