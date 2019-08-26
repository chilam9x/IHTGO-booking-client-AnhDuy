import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import styled from "styled-components";
import { withRouter } from "react-router";
import { dispatch, useGlobalState } from "../../Store";
import { SET_MENU } from "../../utils/actions";

const CustomIcon = styled(Icon)`
  color: #3fa0e4;
`;
const { Sider } = Layout;

const SideBar = props => {
  const [state, setState] = useState({
    collapsed: true
  });
  const [key] = useGlobalState("sideBar");
  const onCollapse = () => {
    setState({ ...state, collapsed: !state.collapsed });
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
        defaultSelectedKeys={[key.key]}
        theme="light"
        mode="inline"
        style={{ height: "100%" }}
      >
        <Menu.Item
          key="1"
          onClick={() => {
            dispatch({
              type: SET_MENU,
              key: "1"
            });
            props.history.push("/");
          }}
        >
          <CustomIcon type="form" style={{ fontSize: 22 }} />
          <span className="nav-text">Tạo đơn hàng</span>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            dispatch({
              type: SET_MENU,
              key: "2"
            });
            props.history.push("orders");
          }}
        >
          <CustomIcon type="profile" style={{ fontSize: 22 }} />
          <span className="nav-text">Danh sách đơn</span>
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            localStorage.removeItem("@token");
            window.location.replace("/signin");
          }}
        >
          <CustomIcon type="logout" style={{ fontSize: 22 }} />
          <span className="nav-text">Đăng xuất</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(SideBar);
