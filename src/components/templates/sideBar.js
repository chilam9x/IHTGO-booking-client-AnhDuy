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
      theme="light"
    >
      <Menu
        defaultSelectedKeys={["1"]}
        theme="light"
        mode="inline"
        style={{ height: "100%" }}
      >
        <Menu.Item key="1" onClick={() => redirectTo("/")}>
          <Icon type="form" style={{ fontSize: 24 }} />
          <span className="nav-text">Đặt hàng</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => redirectTo("/orders")}>
          <Icon type="profile" style={{ fontSize: 24 }} />
          <span className="nav-text">Danh sách đơn</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => redirectTo("/logout")}>
          <Icon type="logout" style={{ fontSize: 24 }} />
          <span className="nav-text">Đăng xuất</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(SideBar);
