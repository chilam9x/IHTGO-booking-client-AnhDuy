import React, { useState } from "react";
import { List, Menu, Icon } from "antd";
import OrderItem from "../templates/orderItem";
import ClipLoader from "react-spinners/HashLoader";

const OrderList = props => {
  const [state, setState] = useState({
    loading: false,
    orders: [
      {
        title: "Title 1"
      }
    ]
  });

  return state.loading ? (
    <div style={{ height: window.innerHeight }}>
      <div
        style={{
          margin: "auto",
          position: "flex",
          width: "20%",
          padding: "20% 0"
        }}
      >
        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#b80f0a"}
          loading={true}
        />
      </div>
    </div>
  ) : (
    <div style={{ height: window.innerHeight, padding: 30 }}>
      <Menu selectedKeys={["1"]} mode="horizontal">
        <Menu.Item key="1">Navigation One</Menu.Item>
      </Menu>
      <br />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4
        }}
        dataSource={state.orders}
        renderItem={item => (
          <List.Item>
            <OrderItem {...item} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default OrderList;
