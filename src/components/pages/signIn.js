import React, { useState, useEffect } from "react";
import { Result, Modal, Button, Icon, Input } from "antd";
import axios from "../../utils/axios";

const SignIn = props => {
  const [state, setState] = useState({
    loading: false
  });

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("@token")) window.location.replace("/");
  }, []);

  const showModal = () => {
    setVisible(true);
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
        localStorage.setItem("key", "1");
        window.location.replace("/");
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  const onChangePhone = e => {
    const value = e.target.value;
    setState({
      ...state,
      phone: value
    });
  };

  const onChange = data => {
    setState({
      ...state,
      ...data
    });
  };

  const handleCancel = () => {
    setVisible(false);
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
        visible={visible}
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
            onClick={handleOk}
            disabled={state.loading}
          >
            Đăng nhập
          </Button>
        ]}
      >
        <Input
          allowClear
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Username"
          value={state.phone}
          onChange={onChangePhone}
          style={{ marginBottom: 20 }}
        />
        <Input.Password
          allowClear
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={e => onChange({ password: e.target.value })}
        />
      </Modal>
    </>
  );
};

export default SignIn;
