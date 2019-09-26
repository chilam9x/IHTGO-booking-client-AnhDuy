import React, { useState } from "react";
import { Button, Icon, Input, Alert, Spin, Result } from "antd";
import axios from "../../utils/axios";
import useFormInput from "../../utils/useFormInput";

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
        "https://ratingjob-server.herokuapp.com/https://admin.ihtgo.com.vn/api/v1/customer/password/reset",
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
          subTitle="Đặt lại mật khẩu thành công, vui lòng kiểm tra tin nhắn SMS của bạn!"
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
            placeholder="Số điện thoại"
            style={{ marginBottom: 20 }}
          />
          {state.loading ? (
            <Spin tip="Đang đặt lại mật khẩu..." />
          ) : (
            <Button
              style={{ width: "100%", marginBottom: 20 }}
              key="submit"
              type="danger"
              onClick={handleSignIn}
            >
              Đặt lại mật khẩu
            </Button>
          )}
          {error.alert && (
            <Alert
              description="Số điện thoại không tồn tại vui lòng kiểm tra lại"
              type="error"
              showIcon
            />
          )}
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
