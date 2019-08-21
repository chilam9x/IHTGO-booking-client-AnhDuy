import React from "react";
import { Card } from "antd";

const OrderItem = props => {
  return (
    <Card size="small" title={props.title}>
      Card content
    </Card>
  );
};

export default OrderItem;
