import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin, Result } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";
import languages from "../../utils/languages";
const Lang = languages("login");

const ForgotPasswordForm = props => {
  const [state, setState] = useState({
    loading: false
  });

  const [error, setError] = useState({
    alert: false
  });

  const [success, setSuccess] = useState(false);

  const phone = useFormInput();

  const handleSignIn = () => {
    setState({ ...state, loading: true });
    axios
      .post(
        "https://iht-cors-server.herokuapp.com/https://admin.ihtgo.com.vn/api/v1/customer/password/reset",
        {
          phone: phone.value
        }
      )
      .then(res => {
        if (res.data.error_code !== 0) {
          setError({
            alert: true
          });
        } else {
          setSuccess(true);
        }
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
      {success ? (
        <Result
          status="success"
          subTitle={Lang.forgot_ok}
          extra={[
            <Button type="primary" key="console" onClick={props.back}>
              Đăng nhập lại
            </Button>,
            <Button key="buy" onClick={() => setSuccess(false)}>
              Thử lại
            </Button>
          ]}
        />
      ) : (
        <>
          <Input
            {...phone}
            allowClear
            prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={Lang.phone}
            style={{ marginBottom: 20 }}
          />
          {state.loading ? (
            <Spin tip={Lang.forgot_msg} />
          ) : (
            <Button
              style={{ width: "100%", marginBottom: 20 }}
              key="submit"
              type="danger"
              onClick={handleSignIn}
            >
              {Lang.reset_pwd}
            </Button>
          )}
          {error.alert && (
            <Alert description={Lang.forgot_1} type="error" showIcon />
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
