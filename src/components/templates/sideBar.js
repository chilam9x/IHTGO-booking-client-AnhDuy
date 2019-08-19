import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Sider } = Layout;

const SideBar = props => {
  const [state, setState] = useState({
    collapsed: true
  });

  const onCollapse = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  const redirectTo = path => {
    props.history.push(path);
  };

  return (
    <Sider
      trigger={
        state.collapsed ? (
          <Icon type="menu-unfold" style={{ fontSize: 20 }} />
        ) : (
          <Icon type="menu-fold" style={{ fontSize: 30 }} />
        )
      }
      collapsible
      collapsed={state.collapsed}
      onCollapse={onCollapse}
      width="10%"
      theme="dark"
    >
      <Menu defaultSelectedKeys={["1"]} theme="dark" mode="inline">
        <Menu.Item key="1" onClick={() => redirectTo("/")}>
          <Icon type="dashboard" />
          <span className="nav-text">Dashboard</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(SideBar);
