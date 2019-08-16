import React from "react";
import { Collapse } from "antd";
import LazyImport from "../../utils/lazyImport";

const { Panel } = Collapse;
const ContactInfo = LazyImport(() => import("../organisms/contactDescription"));
const OrderInfo = LazyImport(() => import("../organisms/orderDescription"));
const OrderHistory = LazyImport(() => import("../organisms/orderHistory"));

const OrderDetail = () => {
  return (
    <Collapse defaultActiveKey={["1", "2", "3"]}>
      <Panel header="Thông tin người gửi" key="1">
        <ContactInfo
          name="họ tên người gửi"
          phone="234567"
          address="cvxcvxc"
          date="1/2/200"
        />
      </Panel>
      <Panel header="Thông tin người nhận" key="2">
        <ContactInfo
          name="họ tên người gửi"
          phone="234567"
          address="cvxcvxc"
          date="1/2/200"
        />
      </Panel>
      <Panel header="Chi tiết đơn hàng" key="3">
        <OrderInfo />
      </Panel>
      <Panel header="Thông tin tài xế" key="4">
        <ContactInfo
          name="họ tên người gửi"
          phone="234567"
          address="cvxcvxc"
          date="1/2/200"
        />
      </Panel>
      <Panel header="Lịch sử" key="5">
        <OrderHistory />
      </Panel>
    </Collapse>
  );
};

export default OrderDetail;
