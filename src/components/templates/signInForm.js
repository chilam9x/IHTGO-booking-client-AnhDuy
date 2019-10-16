import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";
import languages from "../../utils/languages";
const Lang = languages("login");

const SignInForm = props => {
  const [state, setState] = useState({
    loading: false
  });

  const [error, setError] = useState({
    alert: false,
    msg: ""
  });

  const phone = useFormInput();
  const password = useFormInput();

  const getHistories = token => {
    axios
      .post("customer/load-histories", { token })
      .then(res => {
        localStorage.setItem("@sender_add", JSON.stringify(res.data.send_add));
        localStorage.setItem("@receive_add", JSON.stringify(res.data.rec_add));
        localStorage.setItem(
          "@sender_names",
          JSON.stringify(res.data.send_names)
        );
        localStorage.setItem(
          "@sender_phones",
          JSON.stringify(res.data.send_phones)
        );
        localStorage.setItem(
          "@receive_names",
          JSON.stringify(res.data.rec_names)
        );
        localStorage.setItem(
          "@receive_phones",
          JSON.stringify(res.data.rec_phones)
        );
        window.location.replace("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleSignIn = () => {
    setState({ ...state, loading: true });
    axios
      .post("customer-login", {
        phone: phone.value,
        password: password.value
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("@token", res.data.token);
          //get histories
          getHistories(res.data.token);
        } else if (!res.data.success) {
          setError({
            alert: true,
            msg: res.data.message
          });
        }
      })
      .catch(err => {
        setError({
          alert: true,
          msg: Lang.signin_fail
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
        placeholder={Lang.signinform}
        style={{ marginBottom: 20 }}
      />
      <Input.Password
        {...password}
        allowClear
        prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
        placeholder={Lang.pwd}
        style={{ marginBottom: 20 }}
        onPressEnter={handleSignIn}
      />
      {state.loading ? (
        <Spin tip={Lang.signin_msg} />
      ) : (
        <Button
          style={{ width: "100%", marginBottom: 20 }}
          key="submit"
          type="danger"
          onClick={handleSignIn}
        >
          {Lang.signin}
        </Button>
      )}
      {error.alert && <Alert description={error.msg} type="error" showIcon />}
    </div>
  );
};

export default SignInForm;
