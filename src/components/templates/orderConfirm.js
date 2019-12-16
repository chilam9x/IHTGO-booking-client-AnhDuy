import React, { useState, useEffect } from "react";
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
  Tooltip,
  AutoComplete
} from "antd";
import { dispatch, useGlobalState } from "../../Store";
import { SET_ORDER_INFO } from "../../utils/actions";
import axios from "../../utils/axios";
import languages from "../../utils/languages";
const lang = languages("confirm");
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
    value: 2
  });

  const [loading, setLoading] = useState(false);
  const [orderInfo] = useGlobalState("orderInfo");
  const [sourceLocation] = useGlobalState("sourceLocation");
  const [desLocation] = useGlobalState("desLocation");

  useEffect(() => {
    console.log(12345678);
  }, []);

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
              created_id: res.data.data ? res.data.data.id : "",
              created_price: res.data.data ? res.data.data.total_price : ""
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
      title={lang.success}
      subTitle={
        <>
          {lang.code}: {orderInfo.created_id} <br />
          {lang.price}: {orderInfo.created_price} vnđ
        </>
      }
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => window.location.replace("/orders")}
        >
          {lang.list}
        </Button>,
        <Button onClick={props.reset}>{lang.create}</Button>
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
      <Divider orientation="left">{lang.or_name}</Divider>
      <Input
        placeholder={lang.or_name}
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
      <Tooltip title={lang.code_tip}>
        <Input
          allowClear
          placeholder={lang.code}
          value={orderInfo.coupon_code}
          onChange={e => setOrder({ coupon_code: e.target.value })}
          // onSearch={checkCode}
          // enterButton="Kiểm tra code"
        />
      </Tooltip>
      <Divider orientation="left">{lang.payment}</Divider>
      <Radio.Group onChange={onChange} value={state.value}>
        <Radio value={1}>{lang.receiver}</Radio>
        <Radio value={2}>{lang.sender}</Radio>
      </Radio.Group>
      <Divider orientation="left">{lang.send_info}</Divider>
      {state.senderInvalid && (
        <Alert
          message="Vui lòng nhập tên người gửi"
          type="error"
          showIcon
          banner
        />
      )}
      <AutoComplete
        // dataSource={
        //   localStorage.getItem("@sender_names")
        //     ? JSON.parse(localStorage.getItem("@sender_names"))
        //     : []
        // }
        allowClear
        placeholder={lang.name}
        style={{ width: "100%", marginBottom: 10 }}
        value={orderInfo.sender_name}
        onChange={value => setOrder({ sender_name: value })}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      {state.senderPhone && (
        <Alert
          message="Vui lòng nhập số điện thoại người gửi"
          type="error"
          showIcon
          banner
        />
      )}
      <AutoComplete
        allowClear
        // dataSource={
        //   localStorage.getItem("@sender_phones")
        //     ? JSON.parse(localStorage.getItem("@sender_phones"))
        //     : []
        // }
        placeholder={lang.phone}
        style={{ width: "100%" }}
        value={orderInfo.sender_phone}
        onChange={value => {
          if (!/[a-z]/.test(value.toLowerCase()))
            setOrder({ sender_phone: value });
        }}
      />
      <Divider orientation="left">{lang.rec_info}</Divider>
      {state.receiverInvalid && (
        <Alert
          message="Vui lòng nhập tên người nhận"
          type="error"
          showIcon
          banner
        />
      )}
      <AutoComplete
        allowClear
        placeholder={lang.name}
        // dataSource={
        //   localStorage.getItem("@receive_names")
        //     ? JSON.parse(localStorage.getItem("@receive_names"))
        //     : []
        // }
        style={{ width: "100%", marginBottom: 10 }}
        value={orderInfo.receiver_name}
        onChange={value => setOrder({ receiver_name: value })}
        filterOption={(inputValue, option) =>
          option.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      {state.receiverPhone && (
        <Alert
          message="Vui lòng nhập số điện thoại nhận hàng"
          type="error"
          showIcon
          banner
        />
      )}
      <AutoComplete
        allowClear
        // dataSource={
        //   localStorage.getItem("@receive_phones")
        //     ? JSON.parse(localStorage.getItem("@receive_phones"))
        //     : []
        // }
        placeholder={lang.phone}
        style={{ width: "100%" }}
        value={orderInfo.receiver_phone}
        onChange={value => {
          if (!/[a-z]/.test(value.toLowerCase()))
            setOrder({ receiver_phone: value });
        }}
      />
      <Divider orientation="left">{lang.note}</Divider>
      <Input.TextArea
        placeholder={lang.note_body}
        autosize={{ minRows: 2, maxRows: 6 }}
        value={orderInfo.note}
        onChange={e => setOrder({ note: e.target.value })}
      />
      <br />
      <Statistic
        title={<Row>{lang.price} (VNĐ)</Row>}
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
              {lang.back}
            </Button>
            <Button
              style={{ marginTop: 10 }}
              size="large"
              type="danger"
              onClick={confirm}
            >
              <b>
                {lang.confirm} <Icon type="right" />
              </b>
            </Button>
          </>
        )}
      </Row>
    </div>
  );
};

export default OrderConfirm;
