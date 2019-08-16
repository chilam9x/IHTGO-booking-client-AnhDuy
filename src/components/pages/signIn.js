import React, { useState, useEffect } from "react";
import { Result, Modal, Button, Form, Icon, Input } from "antd";

const SignIn = props => {
  const [state, setState] = useState({
    loading: false,
    visible: true
  });

  useEffect(() => {
    // if (localStorage.getItem("user_info")) window.location.href = "/";
    // return () => {
    //   localStorage.removeItem("user_info");
    // };
  }, [state]);

  const showModal = () => {
    setState({
      ...state,
      visible: true
    });
  };

  const handleOk = () => {
    setState({ ...state, loading: true });
    localStorage.setItem("user_info", 1234);
    window.location.href = "/";
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
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SignIn;
