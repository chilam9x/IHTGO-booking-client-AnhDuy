import React from "react";
import { GlobalStateProvider } from "./Store";
import "antd/dist/antd.css";
import DynamicImport from "./utils/lazyImport";
import "./utils/firebase";
import { Layout } from "antd";
import RouteMap from "./Route";
import { BrowserRouter as Router } from "react-router-dom";

const { Content } = Layout;

const Header = DynamicImport(() => import("./components/templates/header"));
const SideBar = DynamicImport(() => import("./components/templates/sideBar"));
const SignIn = DynamicImport(() => import("./components/pages/signIn"));
const height = window.innerHeight;

const App = () => {
  return (
    <GlobalStateProvider>
      <Router>
        {console.log(localStorage.getItem("user_info"))}
        {localStorage.getItem("user_info") ? (
          <Layout>
            <SideBar />
            <Layout>
              <Header />
              <Content
                style={{
                  margin: "10px",
                  overflow: "initial",
                  height: height
                }}
              >
                <div style={{ padding: 24, background: "#fff" }}>
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
