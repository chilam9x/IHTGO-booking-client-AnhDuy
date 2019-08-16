import React from "react";

const OrderConfirm = props => {
  return props.finish ? "hoàn thành" : "xác nhận đặt hàng";
};

export default OrderConfirm;
