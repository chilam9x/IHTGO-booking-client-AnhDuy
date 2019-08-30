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
  Radio,
  Spin,
  Tooltip
} from "antd";
import { dispatch, useGlobalState } from "../../Store";
import { SET_ORDER_INFO } from "../../utils/actions";
import axios from "../../utils/axios";

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

  const [loading, setLoading] = useState(false);
  const [orderInfo] = useGlobalState("orderInfo");
  const [sourceLocation] = useGlobalState("sourceLocation");
  const [desLocation] = useGlobalState("desLocation");

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
    setState({
      ...state,
      ...validate
    });
    return isValid;
  };

  const confirm = () => {
    if (isValid()) {
      setLoading(true);
      //check coupon code
      //end check
      //create order
      axios
        .post("customer/create-order", {
          distance: orderInfo.distance,
          length: orderInfo.len,
          width: orderInfo.width,
          height: orderInfo.height,
          weight: orderInfo.weight,
          car_option: orderInfo.isDocument ? 2 : orderInfo.isInventory ? 4 : 1,
          is_speed: orderInfo.isSpeed ? 1 : 0,
          hand_on: orderInfo.isHandOn ? 1 : 0,
          discharge: orderInfo.isDischarge ? 1 : 0,
          payer: state.value,
          sender_name: orderInfo.sender_name,
          sender_phone: orderInfo.sender_phone,
          sender_address: sourceLocation.place,
          receive_name: orderInfo.receiver_name,
          receive_phone: orderInfo.receiver_phone,
          receive_address: desLocation.place,
          note: orderInfo.note,
          take_money: orderInfo.cod,
          coupon_code: orderInfo.coupon_code,
          image_order: null,
          name: orderInfo.name
        })
        .then(res => {
          //add more
          dispatch({
            type: SET_ORDER_INFO,
            order: {
              created_id: res.data.data.id,
              created_price: res.data.data.total_price
            }
          });
          props.next();
        })
        .catch(err => console.log(err))
        .finally(res => setLoading(false));
    }
  };

  return props.finish ? (
    <Result
      status="success"
      title="Bạn đã đặt hàng thành công!"
      subTitle={
        <>
          Mã vận đơn: {orderInfo.created_id} <br />
          Tổng số tiền cước: {orderInfo.created_price} vnđ
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
      <Tooltip title="Nhập mã vận đơn được in sẵn trên tờ bill">
        <Input
          allowClear
          placeholder="Mã đơn hàng"
          value={orderInfo.coupon_code}
          onChange={e => setOrder({ coupon_code: e.target.value })}
          // onSearch={checkCode}
          // enterButton="Kiểm tra code"
        />
      </Tooltip>
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
        {loading ? (
          <Spin tip="Đang xác nhận đơn..." />
        ) : (
          <>
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
          </>
        )}
      </Row>
    </div>
  );
};

export default OrderConfirm;
