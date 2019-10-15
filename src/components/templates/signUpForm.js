import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin, Result } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";
import useFormNumber from "../../utils/useFormNumber";
import languages from "../../utils/languages";
const Lang = languages("login");
const SignUpForm = props => {
  const [state, setState] = useState({
    loading: false,
    isSuccess: false
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

  const isValid = () => {
    if (name.value === "") {
      setError({
        alert: true,
        message: "Họ tên không được bỏ trống"
      });
      return false;
    } else if (email.value === "") {
      setError({
        alert: true,
        message: "Email không được bỏ trống"
      });
      return false;
    } else if (phone.value === "") {
      setError({
        alert: true,
        message: "Số điện thoại không được bỏ trống"
      });
      return false;
    } else if (address.value === "") {
      setError({
        alert: true,
        message: "Địa chỉ không được bỏ trống"
      });
      return false;
    } else if (password.value.length < 8) {
      setError({
        alert: true,
        message: "Mật khẩu phải dài hơn 8 ký tự"
      });
      return false;
    } else if (password.value !== confirm.value) {
      setError({
        alert: true,
        message: "Mật khẩu xác nhận không trùng khớp"
      });
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    if (isValid()) {
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
            setState({ ...state, loading: false });
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
    }
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
        placeholder={Lang.username}
        style={{ marginBottom: 20 }}
      />
      <Input
        {...email}
        allowClear
        prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={Lang.email}
        style={{ marginBottom: 20 }}
      />
      <Input
        {...phone}
        allowClear
        prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={Lang.phone}
        style={{ marginBottom: 20 }}
      />
      <Input
        {...address}
        allowClear
        prefix={
          <Icon type="environment" style={{ color: "rgba(0,0,0,.25)" }} />
        }
        placeholder={Lang.add}
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...password}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={Lang.pwd}
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...confirm}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={Lang.confirm_pwd}
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
          {Lang.signup}
        </Button>
      )}
      {error.alert && (
        <Alert description={error.message} type="error" showIcon />
      )}
    </div>
  );
};

export default SignUpForm;
