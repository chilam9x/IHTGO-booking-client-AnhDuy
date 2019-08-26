import React, { useState, useEffect } from "react";
import { Menu, Input, Table, Tag, Button, Icon } from "antd";
import PulseLoader from "react-spinners/PulseLoader";
import DynamicImport from "../../utils/lazyImport";
import axios from "../../utils/axios";
import { dispatch, useGlobalState } from "../../Store";
import {
  SET_ORDER_LIST,
  SET_ORDER_LIST_ALL,
  SET_ORDER_LIST_WAITING,
  SET_ORDER_LIST_FINISHED,
  SET_ORDER_LIST_CANCELLED,
  RESET_ORDER_LIST_ALL,
  RESET_ORDER_LIST_WAITING,
  RESET_ORDER_LIST_FINISHED,
  RESET_ORDER_LIST_CANCELLED
} from "../../utils/actions";
import { ALL, WAITING, FINISHED, CANCELLED } from "../../utils/constants";
import moment from "moment";
import "moment/locale/vi";

const OrderItem = DynamicImport(() => import("../templates/orderItem"));

const getColorCode = status => {
  if (status === 1 || status === 2 || status === 3) {
    return "blue";
  } else if (status === 4) {
    return "green";
  } else if (status === 5 || status === 6 || status === 7) {
    return "red";
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
    render: (text, record, index) => (
      <Tag color={getColorCode(record.status)} style={{ padding: "0px 20px" }}>
        {text}
      </Tag>
    )
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
    selectedOrder: null
  });

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [orders] = useGlobalState("orderList");
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const id = query.get("id");
    if (id && id !== "") {
      setState({
        ...state,
        selectedOrder: id
      });
      setVisible(true);
    }
    if (!orders.all || orders.all.length === 0) {
      getAll();
    } else {
      setLoading(false);
    }
    if (!orders.waiting || orders.waiting.length === 0) {
      getWaiting();
    } else {
      setLoading(false);
    }
    if (!orders.finished || orders.finished.length === 0) {
      getFinished();
    } else {
      setLoading(false);
    }

    if (!orders.cancelled || orders.cancelled.length === 0) {
      getCancelled();
    } else {
      setLoading(false);
    }
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
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
      .finally(() => setLoading(false));
  };

  const loadMore = () => {
    setLoading(true);
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

  const search = value => {
    setLoading(true);
    orders.current_option === ALL
      ? searchAll(value)
      : orders.current_option === WAITING
      ? searchWaiting(value)
      : orders.current_option === FINISHED
      ? searchFinished(value)
      : orders.current_option === CANCELLED
      ? searchCancelled(value)
      : searchAll(value);
  };

  const searchAll = value => {
    setLoading(true);
    dispatch({
      type: RESET_ORDER_LIST_ALL,
      orders: []
    });

    axios
      .post("customer/search-all", {
        search: value,
        page: orders.all ? orders.all.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_ALL,
          orders: res.data
        });
      })
      .finally(() => setLoading(false));
  };

  const searchWaiting = value => {
    dispatch({
      type: RESET_ORDER_LIST_WAITING,
      orders: []
    });
    axios
      .post("customer/search-waiting", {
        search: value,
        page: orders.waiting ? orders.waiting.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_WAITING,
          orders: res.data
        });
      })
      .finally(() => setLoading(false));
  };

  const searchFinished = value => {
    dispatch({
      type: RESET_ORDER_LIST_FINISHED,
      orders: []
    });
    axios
      .post("customer/search-finished", {
        search: value,
        page: orders.finished ? orders.finished.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_FINISHED,
          orders: res.data
        });
      })
      .finally(() => setLoading(false));
  };

  const searchCancelled = value => {
    dispatch({
      type: RESET_ORDER_LIST_CANCELLED,
      orders: []
    });
    axios
      .post("customer/search-cancelled", {
        search: value,
        page: orders.cancelled ? orders.cancelled.length : 0
      })
      .then(res => {
        dispatch({
          type: SET_ORDER_LIST_CANCELLED,
          orders: res.data
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ height: "100%", padding: 30 }}>
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
          <Icon type="tag" theme="filled" style={{ color: "blue" }} /> Đơn chưa
          giao
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
          <Icon type="tag" theme="filled" style={{ color: "green" }} /> Đơn đã
          giao
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
          <Icon type="tag" theme="filled" style={{ color: "red" }} />
          Đơn đã hủy
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            allowClear
            placeholder="Tìm đơn hàng theo mã vận đơn"
            onSearch={search}
            style={{ width: 400, marginLeft: 20 }}
          />
        </Menu.Item>
      </Menu>
      <br />
      <Table
        rowKey="id"
        loading={loading}
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
              props.history.replace("orders?id=" + record.id);
              setState({
                ...state,
                selectedOrder: record.id
              });
              setVisible(true);
            }
          };
        }}
      />

      <Button
        style={{ margin: "20px auto", display: "flex", padding: " 0 50px" }}
        type="danger"
        onClick={loadMore}
        disabled={loading}
      >
        Xem thêm <PulseLoader size={5} color={"#fff"} />
      </Button>
      <OrderItem close={onClose} visible={visible} id={state.selectedOrder} />
    </div>
  );
};

export default OrderList;
