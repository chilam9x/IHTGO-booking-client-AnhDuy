import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Sider } = Layout;

const SideBar = props => {
  const [state, setState] = useState({
    collapsed: false
  });

  const onCollapse = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  const redirectTo = path => {
    props.history.push(path);
  };

  return (
    <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="1" onClick={() => redirectTo("/")}>
          <Icon type="dashboard" />
          <span className="nav-text">Dashboard</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => redirectTo("/orders")}>
          <Icon type="shopping-cart" />
          <span className="nav-text">Đơn hàng</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => redirectTo("/map")}>
          <Icon type="shopping-cart" />
          <span className="nav-text">Bản đồ</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(SideBar);
