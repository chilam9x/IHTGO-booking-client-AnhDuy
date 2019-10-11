import React, { useEffect, useState } from "react";
import DescriptionItem from "../atoms/descriptionItem";
import { Drawer, Row, Col, Divider, Statistic, Button } from "antd";
import QRCode from "qrcode.react";
import DynamicImport from "../../utils/lazyImport";
import axios from "../../utils/axios";

const OrderError = DynamicImport(() => import("../organisms/orderError"));
const OrderItemLoading = DynamicImport(() =>
  import("../organisms/orderItemLoading")
);

const BillForm = DynamicImport(() => import("./billForm"));

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
    order: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [print, setPrint] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    if (props.id) {
      axios
        .post("customer/order-detail/" + props.id)
        .then(res => {
          if (res.data.data) {
            setState({
              order: res.data.data
            });
          } else setError(true);
        })
        .catch(err => setError(true))
        .finally(() => setLoading(false));
    }
  }, [props.id]);

  const getSize = () => {
    const l = state.order.len ? state.order.len : 0;
    const w = state.order.width ? state.order.width : 0;
    const h = state.order.height ? state.order.height : 0;
    return l + "x" + w + "x" + h + "cm";
  };

  return (
    <Drawer
      width={window.innerWidth / 2}
      placement="right"
      closable={false}
      onClose={props.close}
      visible={props.visible}
    >
      {loading ? (
        <OrderItemLoading />
      ) : error ? (
        <OrderError />
      ) : (
        <>
          <BillForm
            visible={print}
            close={() => setPrint(false)}
            data={state.order}
          />
          <div>
            <p
              style={{
                ...pStyle,
                marginBottom: 10,
                backgroundColor: "#ff4d4f",
                color: "#fff",
                padding: "3px 20px"
              }}
            >
              Mã vận đơn {state.order.coupon_code}
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              Tên đơn hàng: {state.order.name} ({state.order.code}){" "}
              <Button
                type="danger"
                icon="printer"
                onClick={() => setPrint(true)}
              >
                In hóa đơn
              </Button>
            </p>
            <Divider orientation="left">Thông tin nơi gửi</Divider>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Họ tên"
                  content={state.order.sender_name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Số điện thoại"
                  content={state.order.sender_phone}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Địa chỉ"
                  content={state.order.sender_address}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Ghi chú" content={state.order.note} />
              </Col>
            </Row>
            <Divider orientation="left">Thông tin nơi nhận</Divider>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title="Họ tên"
                  content={state.order.receive_name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="Số điện thoại"
                  content={state.order.receive_phone}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title="Địa chỉ"
                  content={state.order.receive_address}
                />
              </Col>
            </Row>
            <Divider orientation="left">Thông số đơn hàng</Divider>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Lộ trình"
                  content={state.order.distance && state.order.distance + " km"}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem title="Kích thước" content={getSize()} />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Cân nặng"
                  content={state.order.weight && state.order.weight + " kg"}
                />
              </Col>
            </Row>
            <Divider orientation="left">Tùy chọn đơn hàng</Divider>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Giao tận tay"
                  content={state.order.hand_on ? "Có" : "Không"}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Giao hỏa tốc"
                  content={state.order.is_speed ? "Có" : "Không"}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title="Làm hàng siêu thị"
                  content={state.order.car_option === 4 ? "Có" : "Không"}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Thu hộ"
                  content={
                    state.order.take_money
                      ? state.order.take_money + " vnđ"
                      : "0 vnđ"
                  }
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title="Người thanh toán"
                  content={state.order.payer === 1 ? "Người nhận" : "Người gửi"}
                />
              </Col>
            </Row>
            <Divider orientation="left">Thanh toán</Divider>
            <Statistic
              title={"Cước phí tạm tính (VNĐ)"}
              value={formatMoney(parseInt(state.order.total_price))}
              style={{ marginTop: 10 }}
              valueStyle={{ color: "#68bd45" }}
            />
            <Divider orientation="left">Lịch sử giao hàng</Divider>
            <Row>
              <Col span={16}>
                {/* <Steps direction="vertical" size="small" current={3}>
                <Step title="Ngày tạo" description={state.order.created_at} />
                <Step title="Ngày giao" description={state.order.created_at} />
                <Step
                  title="Ngày nhận hàng"
                  description={state.order.created_at}
                />
              </Steps> */}
              </Col>
              <Col span={8}>
                <QRCode value={String(state.order.code)} />
              </Col>
            </Row>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default OrderItem;
