import React, { useState, useEffect } from "react";
import { Menu, Input, Table, Tag, Button } from "antd";
import ClipLoader from "react-spinners/ScaleLoader";
import PulseLoader from "react-spinners/PulseLoader";
import DynamicImport from "../../utils/lazyImport";

const OrderItem = DynamicImport(() => import("../templates/orderItem"));

const { Search } = Input;
const columns = [
  {
    title: "Mã vận đơn",
    dataIndex: "id",
    key: "id",
    render: text => (
      <Tag color={"green"} style={{ padding: "0px 20px" }}>
        {text}
      </Tag>
    )
  },
  {
    title: "Tên đơn hàng",
    dataIndex: "title",
    key: "name",
    render: text => text
  },
  {
    title: "Tổng tiền",
    dataIndex: "title",
    key: "price",
    render: text => text
  },
  {
    title: "Nơi gửi",
    dataIndex: "title",
    key: "sender",
    render: text => text
  },
  {
    title: "Nơi nhận",
    dataIndex: "title",
    key: "receiver",
    render: text => text
  },
  {
    title: "Ngày tạo",
    dataIndex: "title",
    key: "create_date",
    render: text => text
  }
];

const OrderList = props => {
  const [state, setState] = useState({
    loading: false,
    visible: false,
    orders: [
      {
        id: 123456789,
        title: "Title 1"
      },
      {
        id: 12345678229,
        title: "Title 1"
      }
    ],
    type: "all",
    selectedOrder: null
  });

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
  }, []);

  return (
    <div style={{ height: window.innerHeight, padding: 30 }}>
      <Menu selectedKeys={[state.type]} mode="horizontal">
        <Menu.Item
          key="all"
          onClick={() => setState({ ...state, type: "all" })}
        >
          Tất cả
        </Menu.Item>
        <Menu.Item
          key="pending"
          onClick={() => setState({ ...state, type: "pending" })}
        >
          Đơn chưa giao
        </Menu.Item>
        <Menu.Item
          key="finish"
          onClick={() => setState({ ...state, type: "finish" })}
        >
          Đơn đã giao
        </Menu.Item>
        <Menu.Item
          key="cancel"
          onClick={() => setState({ ...state, type: "cancel" })}
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
        dataSource={state.orders}
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
      {state.loading ? (
        <ClipLoader
          css={{ margin: "20px auto", display: "flex", width: "300px" }}
          size={400}
          color={"red"}
        />
      ) : (
        <Button
          style={{ margin: "20px auto", display: "flex", padding: " 0 50px" }}
          type="danger"
        >
          Xem thêm <PulseLoader size={5} color={"#fff"} />
        </Button>
      )}
      <OrderItem
        close={onClose}
        visible={state.visible}
        id={state.selectedOrder}
      />
    </div>
  );
};

export default OrderList;
