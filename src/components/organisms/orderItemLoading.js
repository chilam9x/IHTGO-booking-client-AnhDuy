import React from "react";
import { Divider, Skeleton } from "antd";
import languages from "../../utils/languages";

const lang = languages("confirm");

const OrderItemLoading = props => {
  return (
    <>
      <Skeleton active title={false} paragraph={{ rows: 1 }} />
      <Divider orientation="left">{lang.send_info}</Divider>
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
      <Divider orientation="left">{lang.rec_info}</Divider>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
      <Divider orientation="left">{lang.order_info}</Divider>
      <Skeleton active title={false} paragraph={{ rows: 1 }} />
      <Divider orientation="left">{lang.option}</Divider>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
    </>
  );
};

export default OrderItemLoading;
