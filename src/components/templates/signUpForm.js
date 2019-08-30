import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin, Result } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";
import useFormNumber from "../../utils/useFormNumber";

const SignUpForm = props => {
  const [state, setState] = useState({
    loading: false,
    isSuccess: true
  });

  const [error, setError] = useState({
    alert: false,
    message: ""
  });

  const name = useFormInput();
  const email = useFormInput();
  const phone = useFormNumber();
  const address = useFormInput();
  const password = useFormInput();
  const confirm = useFormInput();

  const handleRegister = () => {
    setState({ ...state, loading: true });
    axios
      .post("customer-register", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        password: password.value
      })
      .then(res => {
        if (res.data.fail) {
          setError({
            alert: true,
            message: res.data.fail
          });
        } else {
          setState({
            ...state,
            isSuccess: true,
            loading: false
          });
        }
      })
      .catch(err => {
        setState({ ...state, loading: false });
      });
  };

  return state.isSuccess ? (
    <Result
      status="success"
      title="Bạn đã đăng ký tài khoản thành công!"
      extra={[
        <Button
          key="buy"
          onClick={() => {
            props.back();
            setState({
              ...state,
              isSuccess: false
            });
          }}
        >
          Quay lại trang đăng nhập
        </Button>
      ]}
    />
  ) : (
    <div style={{ margin: 10 }}>
      <Input
        {...name}
        allowClear
        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Tên đăng nhập"
        style={{ marginBottom: 20 }}
      />
      <Input
        {...email}
        allowClear
        prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Email"
        style={{ marginBottom: 20 }}
      />
      <Input
        {...phone}
        allowClear
        prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Số điện thoại"
        style={{ marginBottom: 20 }}
      />
      <Input
        {...address}
        allowClear
        prefix={
          <Icon type="environment" style={{ color: "rgba(0,0,0,.25)" }} />
        }
        placeholder="Địa chỉ"
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...password}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Mật khẩu"
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...confirm}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder="Xác nhận mật khẩu"
        style={{ marginBottom: 20 }}
      />
      {state.loading ? (
        <Spin tip="Đang tiến hành đăng ký..." />
      ) : (
        <Button
          style={{ width: "100%", marginBottom: 20 }}
          key="submit"
          type="danger"
          onClick={handleRegister}
        >
          Đăng ký
        </Button>
      )}
      {error.alert && (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      )}
    </div>
  );
};

export default SignUpForm;
