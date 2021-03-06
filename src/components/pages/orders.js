import React, { useState, useEffect } from "react";
import { Menu, Table, Tag, Button, Icon, Input } from "antd";
import PulseLoader from "react-spinners/PulseLoader";
import DynamicImport from "../../utils/lazyImport";
import axios from "../../utils/axios";
import { dispatch, useGlobalState } from "../../Store";
import {
  SET_ORDER_LIST,
  SET_ORDER_LIST_ALL,
  SET_ORDER_LIST_SEARCH,
  SET_ORDER_LIST_WAITING,
  SET_ORDER_LIST_FINISHED,
  SET_ORDER_LIST_CANCELLED
} from "../../utils/actions";
import {
  ALL,
  WAITING,
  FINISHED,
  CANCELLED,
  SEARCH
} from "../../utils/constants";
import languages from "../../utils/languages";
import useFormInput from "../../utils/useFormInput";
import moment from "moment";

const lang = languages("list");
const OrderItem = DynamicImport(() => import("../templates/orderItem"));

var nf = Intl.NumberFormat();

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
    title: lang.code,
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
    title: lang.or_name,
    dataIndex: "name",
    key: "name",
    render: (text, record, index) => (
      <Tag color={getColorCode(record.status)} style={{ padding: "0px 20px" }}>
        {text}
      </Tag>
    )
  },
  {
    title: lang.price,
    dataIndex: "total_price",
    key: "price",
    render: text => nf.format(text)
  },
  {
    title: lang.sendadd,
    dataIndex: "sender_address",
    key: "sender",
    render: text => text
  },
  {
    title: lang.recadd,
    dataIndex: "receive_address",
    key: "receiver",
    render: text => text
  },
  {
    title: lang.credate,
    dataIndex: "created_at",
    key: "created_at",
    render: text => moment(text).format("DD/MM/YYYY")
  }
];

const OrderList = props => {
  const [state, setState] = useState({
    selectedOrder: null
  });

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const [orders] = useGlobalState("orderList");
  const search = useFormInput(null);
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const id = query.get("id");
    if (id && id !== "") {
      setState({
        selectedOrder: id
      });
      setVisible(true);
    }
    if (!orders.all || orders.all.length === 0) {
      onSearch();
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

  const onSearch = () => {
    if (search.value && search.value != "") {
      dispatch({
        type: SET_ORDER_LIST,
        orders: {
          current_option: SEARCH
        }
      });
      setLoading(true);
      axios
        .post("customer/search-all", {
          search: search.value,
          skip: orders.search ? orders.search.length : 0
        })
        .then(res => {
          console.log(res.data);
          dispatch({
            type: SET_ORDER_LIST_SEARCH,
            orders: res.data
          });
        })
        .finally(() => setLoading(false));
    } else {
      getAll();
    }
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
      .post("customer/order-cancelled", {
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
      ? onSearch()
      : orders.current_option === WAITING
      ? getWaiting()
      : orders.current_option === FINISHED
      ? getFinished()
      : orders.current_option === CANCELLED
      ? getCancelled()
      : onSearch();
  };

  return (
    <div style={{ height: "100%", padding: 30 }}>
      <Menu selectedKeys={[orders.current_option]} mode="horizontal">
        <Menu.Item
          key={ALL || SEARCH}
          onClick={() =>
            dispatch({
              type: SET_ORDER_LIST,
              orders: {
                current_option: ALL
              }
            })
          }
        >
          {lang.all}
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
          <Icon type="tag" theme="filled" style={{ color: "blue" }} />{" "}
          {lang.waiting}
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
          <Icon type="tag" theme="filled" style={{ color: "green" }} />{" "}
          {lang.finish}
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
          {lang.cancel}
        </Menu.Item>
        <Menu.Item>
          <Input.Search
            {...search}
            allowClear
            placeholder={lang.search}
            onSearch={onSearch}
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
            : orders.current_option === SEARCH
            ? orders.search
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
        {lang.more} <PulseLoader size={5} color={"#fff"} />
      </Button>

      <OrderItem close={onClose} visible={visible} id={state.selectedOrder} />
    </div>
  );
};

export default OrderList;
