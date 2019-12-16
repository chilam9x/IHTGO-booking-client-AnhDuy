import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import { dispatch, useGlobalState } from "../../Store";
import { SET_MENU } from "../../utils/actions";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Icon,
  Layout,
  Spin,
  Menu
} from "antd";
import useFormInput from "../../utils/useFormInput";
import { message } from "antd";
import axios from "../../utils/axios";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const CustomIcon = styled(Icon)`
  color: #3fa0e4;
`;
const { Sider } = Layout;

const SideBar = props => {
  const oldPwd = useFormInput("");
  const newPwd = useFormInput("");
  const renewPwd = useFormInput("");

  const [state, setState] = useState({
    collapsed: true
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [key] = useGlobalState("sideBar");
  const onCollapse = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const clear = () => {
    oldPwd.setValue("");
    newPwd.setValue("");
    renewPwd.setValue("");
  };

  const changePassword = () => {
    if (oldPwd.value === "" || newPwd.value === "" || renewPwd.value === "")
      message.error("Vui lòng nhập đầy đủ thông tin");
    else if (newPwd.value !== renewPwd.value)
      message.error(
        "Mật khẩu mới và mật khẩu xác nhận không trùng khớp, vui lòng nhập lại"
      );
    else {
      setLoading(true);
      axios
        .post("customer/change-passwd", {
          old_pwd: oldPwd.value,
          new_pwd: newPwd.value
        })
        .then(res => {
          clear();
          message.success("Thay đổi mật khẩu thành công");
          onClose();
        })
        .catch(err => console.log(err))
        .finally(res => setLoading(false));
    }
  };

  return (
    <>
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
            <span className="nav-text">
              {localStorage.getItem("@lang") === "cn"
                ? "創建訂單"
                : "Tạo đơn hàng"}
            </span>
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
            <span className="nav-text">
              {localStorage.getItem("@lang") === "cn"
                ? "訂單名單"
                : "Danh sách đơn"}
            </span>
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              dispatch({
                type: SET_MENU,
                key: "4"
              });
              showDrawer();
            }}
          >
            <CustomIcon type="user" style={{ fontSize: 22 }} />
            <span className="nav-text">
              {localStorage.getItem("@lang") === "cn"
                ? "訂單名單"
                : "Thông tin cá nhân"}
            </span>
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              localStorage.removeItem("@token");
              window.location.replace("/signin");
            }}
          >
            <CustomIcon type="logout" style={{ fontSize: 22 }} />
            <span className="nav-text">
              {localStorage.getItem("@lang") === "cn" ? "登出" : "Đăng xuất"}
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Drawer
        title="Đổi mật khẩu"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mật khẩu cũ">
                <Input.Password
                  placeholder="Vui lòng nhập mật khẩu cũ"
                  {...oldPwd}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Mật khẩu mới">
                <Input.Password
                  placeholder="Vui lòng nhập mật khẩu mới"
                  {...newPwd}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Xác nhận mật khẩu mới">
                <Input.Password
                  placeholder="Xác nhận lại mật khẩu mới"
                  {...renewPwd}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right"
          }}
        >
          {loading ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Đóng
              </Button>
              <Button onClick={changePassword} type="danger">
                Đổi mật khẩu
              </Button>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default withRouter(SideBar);
