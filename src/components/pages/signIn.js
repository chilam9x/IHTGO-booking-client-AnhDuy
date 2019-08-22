import React, { useState, useEffect } from "react";
import { Result, Modal, Button, Form, Icon, Input } from "antd";
import axios from "../../utils/axios";

const SignIn = props => {
  const [state, setState] = useState({
    loading: false,
    visible: true
  });

  useEffect(() => {
    if (localStorage.getItem("@token")) window.location.href = "/";
  }, []);

  const showModal = () => {
    setState({
      ...state,
      visible: true,
      phone: null,
      password: null
    });
  };

  const handleOk = () => {
    setState({ ...state, loading: true });
    axios
      .post("customer-login", {
        phone: state.phone,
        password: state.password
      })
      .then(res => {
        localStorage.setItem("@token", res.data.token);
        props.history.push("");
      })
      .catch(err => {})
      .finally(setState({ ...state, loading: false }));
  };

  const onChange = data => {
    setState({
      ...state,
      ...data
    });
  };

  const handleCancel = () => {
    setState({ ...state, visible: false });
  };

  return (
    <>
      <Result
        title="Bạn cần đăng nhập để vào trang quản trị"
        extra={
          <Button type="primary" onClick={showModal}>
            Đăng nhập tại đây
          </Button>
        }
        style={{ backgroundColor: "white" }}
      />
      <Modal
        visible={state.visible}
        title="Đăng nhập tại đây"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Đóng
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={state.loading}
            onClick={handleOk}
          >
            Đăng nhập
          </Button>
        ]}
      >
        <Form>
          <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              value={state.phone}
              onChange={e => onChange({ phone: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={e => onChange({ password: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignIn;
