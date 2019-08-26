import React, { useState } from "react";
import {
  Input,
  Divider,
  Row,
  Button,
  Icon,
  Result,
  Statistic,
  Alert,
  Radio
} from "antd";
import { dispatch, useGlobalState } from "../../Store";
import { SET_ORDER_INFO } from "../../utils/actions";

const formatMoney = money => {
  return money ? parseInt(money / 1000) * 1000 : 0;
};

const OrderConfirm = props => {
  const [state, setState] = useState({
    codeInvalid: false,
    senderInvalid: false,
    receiverInvalid: false,
    senderPhone: false,
    receiverPhone: false,
    value: 1
  });

  const [orderInfo] = useGlobalState("orderInfo");

  const onChange = e => {
    setState({
      value: e.target.value
    });
  };

  const setOrder = data => {
    dispatch({
      type: SET_ORDER_INFO,
      order: {
        ...data
      }
    });
  };

  const isValid = () => {
    let isValid = true;
    let validate = {
      senderInvalid: false,
      receiverInvalid: false,
      senderPhone: false,
      receiverPhone: false
    };

    if (!orderInfo.sender_name) {
      validate.senderInvalid = true;
      isValid = false;
    }
    if (!orderInfo.sender_phone) {
      validate.senderPhone = true;
      isValid = false;
    }
    if (!orderInfo.receiver_name) {
      validate.receiverInvalid = true;
      isValid = false;
    }
    if (!orderInfo.receiver_phone) {
      validate.receiverPhone = true;
      isValid = false;
    }
    if (state.codeInvalid) isValid = false;

    setState({
      ...state,
      ...validate
    });
    return isValid;
  };

  const confirm = () => {
    if (isValid()) props.next();
  };

  const checkCode = () => {
    setState({
      ...state,
      codeInvalid: false
    });
  };

  return props.finish ? (
    <Result
      status="success"
      title="Bạn đã đặt hàng thành công!"
      subTitle={
        <>
          Mã vận đơn: 123456 <br />
          Tổng số tiền cước: 10đ
        </>
      }
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => window.location.replace("/orders")}
        >
          Danh sách đơn hàng
        </Button>,
        <Button onClick={props.reset}>Tạo đơn hàng</Button>
      ]}
    />
  ) : (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Divider orientation="left">Tên đơn hàng (nếu có)</Divider>
      <Input
        placeholder="Tên đơn hàng"
        style={{ width: "100%", marginBottom: 10 }}
        value={orderInfo.name}
        onChange={e => setOrder({ name: e.target.value })}
      />
      {state.codeInvalid && (
        <Alert
          message="Mã đơn hàng đã được sử dụng"
          type="error"
          showIcon
          banner
        />
      )}
      <Input.Search
        allowClear
        placeholder="Mã đơn hàng"
        value={orderInfo.coupon_code}
        onChange={e => setOrder({ name: e.target.value })}
        onSearch={checkCode}
        enterButton="Kiểm tra code"
      />
      <Divider orientation="left">Người thanh toán cước</Divider>
      <Radio.Group onChange={onChange} value={state.value}>
        <Radio value={1}>Người gửi trả</Radio>
        <Radio value={2}>Người nhận trả</Radio>
      </Radio.Group>
      <Divider orientation="left">Thông tin người gửi</Divider>
      {state.senderInvalid && (
        <Alert
          message="Vui lòng nhập tên người gửi"
          type="error"
          showIcon
          banner
        />
      )}
      <Input
        allowClear
        addonBefore="Họ tên"
        placeholder="Họ tên"
        style={{ width: "100%", marginBottom: 10 }}
        value={orderInfo.sender_name}
        onChange={e => setOrder({ sender_name: e.target.value })}
      />
      {state.senderPhone && (
        <Alert
          message="Vui lòng nhập số điện thoại người gửi"
          type="error"
          showIcon
          banner
        />
      )}
      <Input
        allowClear
        addonBefore="Số điện thoại"
        placeholder="Số điện thoại"
        style={{ width: "100%" }}
        value={orderInfo.sender_phone}
        onChange={e => {
          if (!/[a-z]/.test(e.target.value.toLowerCase()))
            setOrder({ sender_phone: e.target.value });
        }}
      />
      <Divider orientation="left">Thông tin người nhận</Divider>
      {state.receiverInvalid && (
        <Alert
          message="Vui lòng nhập tên người nhận"
          type="error"
          showIcon
          banner
        />
      )}
      <Input
        allowClear
        addonBefore="Họ tên"
        placeholder="Họ tên"
        style={{ width: "100%", marginBottom: 10 }}
        value={orderInfo.receiver_name}
        onChange={e => setOrder({ receiver_name: e.target.value })}
      />
      {state.receiverPhone && (
        <Alert
          message="Vui lòng nhập số điện thoại nhận hàng"
          type="error"
          showIcon
          banner
        />
      )}
      <Input
        allowClear
        addonBefore="Số điện thoại"
        placeholder="Số điện thoại"
        style={{ width: "100%" }}
        value={orderInfo.receiver_phone}
        onChange={e => {
          if (!/[a-z]/.test(e.target.value.toLowerCase()))
            setOrder({ receiver_phone: e.target.value });
        }}
      />
      <Divider orientation="left">Ghi chú</Divider>
      <Input.TextArea
        placeholder="Ghi chú của khách hàng"
        autosize={{ minRows: 2, maxRows: 6 }}
        value={orderInfo.note}
        onChange={e => setOrder({ note: e.target.value })}
      />
      <br />
      <Statistic
        title={<Row>Cước phí tạm tính (VNĐ)</Row>}
        value={formatMoney(orderInfo.totalPrice)}
        style={{ marginTop: 10 }}
        valueStyle={{ color: "#68bd45" }}
      />
      <Row>
        <Button
          style={{ marginTop: 20, marginRight: 5 }}
          size="large"
          onClick={props.prev}
        >
          <Icon type="left" />
          Quay lại
        </Button>
        <Button
          style={{ marginTop: 10 }}
          size="large"
          type="danger"
          onClick={confirm}
        >
          <b>
            Xác nhận đơn hàng <Icon type="right" />
          </b>
        </Button>
      </Row>
    </div>
  );
};

export default OrderConfirm;
