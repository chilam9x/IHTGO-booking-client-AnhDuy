import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";

const SignInForm = props => {
  const [state, setState] = useState({
    loading: false
  });

  const [error, setError] = useState({
    alert: false
  });

  const phone = useFormInput();
  const password = useFormInput();

  const handleSignIn = () => {
    setState({ ...state, loading: true });
    axios
      .post("customer-login", {
        phone: phone.value,
        password: password.value
      })
      .then(res => {
        localStorage.setItem("@token", res.data.token);
        window.location.replace("/");
      })
      .catch(err => {
        setError({
          alert: true
        });
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  return (
    <div style={{ margin: 10 }}>
      <Input
        {...phone}
        allowClear
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Số điện thoại/ email"
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...password}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Mật khẩu"
        style={{ marginBottom: 20 }}
        onPressEnter={handleSignIn}
      />
      {state.loading ? (
        <Spin tip="Đang tiến hành đăng nhập..." />
      ) : (
        <Button
          style={{ width: "100%", marginBottom: 20 }}
          key="submit"
          type="danger"
          onClick={handleSignIn}
        >
          Đăng nhập
        </Button>
      )}
      {error.alert && (
        <Alert
          message="Error"
          description="Sai tài khoản hoặc mật khẩu"
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default SignInForm;
