import React, { useState, useEffect } from "react";
import { Menu, Input, Table, Tag, Button } from "antd";
import PulseLoader from "react-spinners/PulseLoader";
import DynamicImport from "../../utils/lazyImport";
import axios from "../../utils/axios";
import { dispatch, useGlobalState } from "../../Store";
import {
  SET_ORDER_LIST,
  SET_ORDER_LIST_ALL,
  SET_ORDER_LIST_WAITING,
  SET_ORDER_LIST_FINISHED,
  SET_ORDER_LIST_CANCELLED
} from "../../utils/actions";
import { ALL, WAITING, FINISHED, CANCELLED } from "../../utils/constants";
import moment from "moment";
import "moment/locale/vi";

const OrderItem = DynamicImport(() => import("../templates/orderItem"));

const { Search } = Input;

const getColorCode = status => {
  if (status == 1 || status == 2 || status == 3) {
    return "blue";
  } else if (status == 4) {
    return "green";
  } else if (status == 5) {
    return "gray";
  } else if (status == 6) {
    return "red";
  } else if (status == 7) {
    return "black";
  }
};

const columns = [
  {
    title: "Mã vận đơn",
    dataIndex: "coupon_code",
    key: "id",
    render: (text, record, index) =>
      text && (
        <Tag
          color={getColorCode(record.status)}
          style={{ padding: "0px 20px" }}
        >
          {text}
        </Tag>
      )
  },
  {
    title: "Tên đơn hàng",
    dataIndex: "name",
    key: "name",
    render: text => text
  },
  {
    title: "Tổng tiền",
    dataIndex: "total_price",
    key: "price",
    render: text => text
  },
  {
    title: "Nơi gửi",
    dataIndex: "sender_address",
    key: "sender",
    render: text => text
  },
  {
    title: "Nơi nhận",
    dataIndex: "receive_address",
    key: "receiver",
    render: text => text
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    render: text => moment(text, "YYYYMMDD hh:mm:ss").fromNow()
  }
];

const OrderList = props => {
  const [state, setState] = useState({
    loading: true,
    visible: false,
    selectedOrder: null
  });

  const [orders] = useGlobalState("orderList");
  const onClose = () => {
    setState({ ...state, visible: false });
  };

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const id = query.get("id");
    if (id && id !== "") {
      setState({
        ...state,
        selectedOrder: id,
        visible: true
      });
    }
    getAll();
    getWaiting();
    getFinished();
    getCancelled();
  }, []);

  const getAll = () => {
    axios
      .post("customer/order-all", {
        skip: orders.all ? orders.all.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_ALL,
          orders: res.data.data
        });
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  const getWaiting = () => {
    axios
      .post("customer/order-waiting", {
        skip: orders.waiting ? orders.waiting.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_WAITING,
          orders: res.data.data
        });
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  const getFinished = () => {
    axios
      .post("customer/order-finish", {
        skip: orders.finished ? orders.finished.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_FINISHED,
          orders: res.data.data
        });
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  const getCancelled = () => {
    axios
      .post("customer/order-cancel", {
        skip: orders.cancelled ? orders.cancelled.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_CANCELLED,
          orders: res.data.data
        });
      })
      .finally(() => setState({ ...state, loading: false }));
  };

  const loadMore = () => {
    setState({ ...state, loading: true });
    orders.current_option === ALL
      ? getAll()
      : orders.current_option === WAITING
      ? getWaiting()
      : orders.current_option === FINISHED
      ? getFinished()
      : orders.current_option === CANCELLED
      ? getCancelled()
      : getAll();
  };

  return (
    <div style={{ height: window.innerHeight, padding: 30 }}>
      <Menu selectedKeys={[orders.current_option]} mode="horizontal">
        <Menu.Item
          key={ALL}
          onClick={() =>
            dispatch({
              type: SET_ORDER_LIST,
              orders: {
                current_option: ALL
              }
            })
          }
        >
          Tất cả
        </Menu.Item>
        <Menu.Item
          key={WAITING}
          onClick={() =>
            dispatch({
              type: SET_ORDER_LIST,
              orders: {
                current_option: WAITING
              }
            })
          }
        >
          Đơn chưa giao
        </Menu.Item>
        <Menu.Item
          key={FINISHED}
          onClick={() =>
            dispatch({
              type: SET_ORDER_LIST,
              orders: {
                current_option: FINISHED
              }
            })
          }
        >
          Đơn đã giao
        </Menu.Item>
        <Menu.Item
          key={CANCELLED}
          onClick={() =>
            dispatch({
              type: SET_ORDER_LIST,
              orders: {
                current_option: CANCELLED
              }
            })
          }
        >
          Đơn đã hủy
        </Menu.Item>
        <Search
          placeholder="Tìm đơn hàng theo mã vận đơn"
          onSearch={value => console.log(value)}
          style={{ width: 400, marginLeft: 20 }}
        />
      </Menu>
      <br />
      <Table
        loading={state.loading}
        columns={columns}
        dataSource={
          orders.current_option === ALL
            ? orders.all
            : orders.current_option === WAITING
            ? orders.waiting
            : orders.current_option === FINISHED
            ? orders.finished
            : orders.current_option === CANCELLED
            ? orders.cancelled
            : orders.all
        }
        pagination={false}
        onRow={record => {
          return {
            onClick: event => {
              setState({
                ...state,
                selectedOrder: record.id,
                visible: true
              });
            }
          };
        }}
      />

      <Button
        style={{ margin: "20px auto", display: "flex", padding: " 0 50px" }}
        type="danger"
        onClick={loadMore}
        disabled={state.loading}
      >
        Xem thêm <PulseLoader size={5} color={"#fff"} />
      </Button>
      <OrderItem
        close={onClose}
        visible={state.visible}
        id={state.selectedOrder}
      />
    </div>
  );
};

export default OrderList;
