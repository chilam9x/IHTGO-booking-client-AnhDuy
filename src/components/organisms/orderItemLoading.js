import React from "react";
import { Divider, Skeleton } from "antd";

const OrderItemLoading = props => {
  return (
    <>
      <Skeleton active title={false} paragraph={{ rows: 1 }} />
      <Divider orientation="left">Thông tin nơi gửi</Divider>
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
      <Divider orientation="left">Thông tin nơi nhận</Divider>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
      <Divider orientation="left">Thông số đơn hàng</Divider>
      <Skeleton active title={false} paragraph={{ rows: 1 }} />
      <Divider orientation="left">Tùy chọn đơn hàng</Divider>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
    </>
  );
};

export default OrderItemLoading;
