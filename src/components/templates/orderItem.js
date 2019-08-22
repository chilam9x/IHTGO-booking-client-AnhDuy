import React, { useEffect, useState } from "react";
import DescriptionItem from "../atoms/descriptionItem";
import { Drawer, Row, Col, Divider, Steps, Statistic } from "antd";
import QRCode from "qrcode.react";
import DynamicImport from "../../utils/lazyImport";

const OrderError = DynamicImport(() => import("../organisms/orderError"));
const OrderItemLoading = DynamicImport(() =>
  import("../organisms/orderItemLoading")
);

const { Step } = Steps;

const pStyle = {
  fontSize: 16,
  color: "rgba(0,0,0,0.85)",
  lineHeight: "24px",
  display: "block",
  marginBottom: 16
};

const formatMoney = money => {
  return parseInt(money / 1000) * 1000;
};

const OrderItem = props => {
  const [state, setState] = useState({
    error: false,
    loading: false
  });

  useEffect(() => {
    if (props.id) {
      console.log("call api");
    }
  }, [props.id]);

  return (
    <Drawer
      width={window.innerWidth / 2}
      placement="right"
      closable={false}
      onClose={props.close}
      visible={props.visible}
    >
      {state.loading ? (
        <OrderItemLoading />
      ) : state.error ? (
        <OrderError />
      ) : (
        <>
          <p
            style={{
              ...pStyle,
              marginBottom: 10,
              backgroundColor: "#ff4d4f",
              color: "#fff",
              padding: "3px 20px"
            }}
          >
            Mã vận đơn {props.id}
          </p>
          <p style={{ ...pStyle, marginBottom: 10 }}>
            Tên đơn hàng: đơn hàng 1
          </p>
          <Divider orientation="left">Thông tin nơi gửi</Divider>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Họ tên" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Số điện thoại" content="000000000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Địa chỉ"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Ghi chú"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider orientation="left">Thông tin nơi nhận</Divider>
          <Row>
            <Col span={12}>
              <DescriptionItem title="Họ tên" content="Lily" />
            </Col>
            <Col span={12}>
              <DescriptionItem title="Số điện thoại" content="000000000" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Địa chỉ"
                content="Make things as simple as possible but no simpler."
              />
            </Col>
          </Row>
          <Divider orientation="left">Thông số đơn hàng</Divider>
          <Row>
            <Col span={8}>
              <DescriptionItem title="Lộ trình" content="5 km" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Kích thước" content="20x20x20 (cm)" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Cân nặng" content="10 (kg)" />
            </Col>
          </Row>
          <Divider orientation="left">Tùy chọn đơn hàng</Divider>
          <Row>
            <Col span={8}>
              <DescriptionItem title="Giao tận tay" content="Có" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Giao hỏa tốc" content="Có" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Bốc xếp hộ" content="Có" />
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <DescriptionItem title="Làm hàng siêu thị" content="Có" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Thu hộ" content="100,000 vnđ" />
            </Col>
            <Col span={8}>
              <DescriptionItem title="Người thanh toán" content="người gửi" />
            </Col>
          </Row>
          <Divider orientation="left">Thanh toán</Divider>
          <Statistic
            suffix={
              <div style={{ color: "red", fontSize: 12 }}>
                (đã cộng 10% VAT)
              </div>
            }
            title={"Cước phí tạm tính (VNĐ)"}
            value={formatMoney(100000)}
            style={{ marginTop: 10 }}
            valueStyle={{ color: "#68bd45" }}
          />
          <Divider orientation="left">Lịch sử giao hàng</Divider>
          <Row>
            <Col span={16}>
              <Steps direction="vertical" size="small" current={3}>
                <Step title="Ngày tạo" description="1/2/21111" />
                <Step title="Ngày giao" description="1/2/21111" />
                <Step title="Ngày nhận hàng" description="1/2/21111" />
              </Steps>
            </Col>
            <Col span={8}>
              <QRCode value={props.id} />
            </Col>
          </Row>
        </>
      )}
    </Drawer>
  );
};

export default OrderItem;
