import React, { useState } from "react";
import { Input, Divider, Row, Button, Icon, Result, Statistic } from "antd";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const OrderConfirm = props => {
  return props.finish ? (
    <Result
      status="success"
      title="Bạn đã đặt hàng thành công!"
      subTitle={
        <>
          Mã vận đơn: 123456 <br />
          Tổng số tiền cước: 10đ
        </>
      }
      extra={[
        <Button type="primary" key="console">
          Danh sách đơn hàng
        </Button>,
        <Button onClick={props.reset}>Tạo đơn hàng</Button>
      ]}
    />
  ) : (
    <div
      style={{
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <Divider orientation="left">Tên đơn hàng (nếu có)</Divider>
      <Input placeholder="Tên đơn hàng" style={{ width: "100%" }} />
      <Divider orientation="left">Thông tin người gửi</Divider>
      <Input addonBefore="Họ tên" style={{ width: "100%", marginBottom: 10 }} />
      <Input addonBefore="Số điện thoại" style={{ width: "100%" }} />
      <Divider orientation="left">Thông tin người nhận</Divider>
      <Input addonBefore="Họ tên" style={{ width: "100%", marginBottom: 10 }} />
      <Input addonBefore="Số điện thoại" style={{ width: "100%" }} />
      <Divider orientation="left">Ghi chú</Divider>
      <Input.TextArea
        placeholder="Ghi chú của khách hàng"
        autosize={{ minRows: 2, maxRows: 6 }}
      />
      <br />
      <Statistic
        title="Cước phí tạm tính (VND)"
        value={formatter.format(112893)}
        style={{ marginTop: 10 }}
        valueStyle={{ color: "#68bd45" }}
      />
      <Row>
        <Button
          style={{ marginTop: 20, marginRight: 5 }}
          size="large"
          onClick={props.prev}
        >
          <Icon type="left" />
          Quay lại
        </Button>
        <Button
          style={{ marginTop: 10 }}
          size="large"
          type="danger"
          onClick={props.next}
        >
          <b>
            Xác nhận đơn hàng <Icon type="right" />
          </b>
        </Button>
      </Row>
    </div>
  );
};

export default OrderConfirm;
