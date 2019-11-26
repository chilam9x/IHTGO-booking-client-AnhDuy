import React, { useEffect, useState } from "react";
import DescriptionItem from "../atoms/descriptionItem";
import { Drawer, Row, Col, Divider, Statistic, Button } from "antd";
import QRCode from "qrcode.react";
import DynamicImport from "../../utils/lazyImport";
import axios from "../../utils/axios";
import languages from "../../utils/languages";

const lang = languages("confirm");
const lang2 = languages("booking");

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
              {lang.code} {state.order.coupon_code}
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              {lang.or_name}: {state.order.name} ({state.order.code})
              <Button
                type="danger"
                icon="printer"
                onClick={() =>
                  window.open(
                    "https://admin.ihtgo.com.vn/print-booking/" + state.order.id
                  )
                }
              >
                {lang2.print}
              </Button>
            </p>
            <Divider orientation="left">{lang.send_info}</Divider>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title={lang.name}
                  content={state.order.sender_name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title={lang.phone}
                  content={state.order.sender_phone}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title={lang2.add}
                  content={state.order.sender_address}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title={lang.note} content={state.order.note} />
              </Col>
            </Row>
            <Divider orientation="left">{lang.rec_info}</Divider>
            <Row>
              <Col span={12}>
                <DescriptionItem
                  title={lang.name}
                  content={state.order.receive_name}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title={lang.phone}
                  content={state.order.receive_phone}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem
                  title={lang2.add}
                  content={state.order.receive_address}
                />
              </Col>
            </Row>
            <Divider orientation="left">{lang2.order_info}</Divider>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.distance}
                  content={state.order.distance && state.order.distance + " km"}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.length + lang2.width + lang2.height}
                  content={getSize()}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.weight}
                  content={state.order.weight && state.order.weight + " kg"}
                />
              </Col>
            </Row>
            <Divider orientation="left">{lang2.option}</Divider>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.handon}
                  content={state.order.hand_on ? lang2.yes : lang2.no}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.speed}
                  content={state.order.is_speed ? lang2.yes : lang2.no}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.market}
                  content={state.order.car_option === 4 ? lang2.yes : lang2.no}
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title={lang2.cod}
                  content={
                    state.order.take_money
                      ? state.order.take_money + " vnđ"
                      : "0 vnđ"
                  }
                />
              </Col>
              <Col span={8}>
                <DescriptionItem
                  title={lang.payment}
                  content={
                    state.order.payer === 1 ? lang.receiver : lang.sender
                  }
                />
              </Col>
            </Row>
            <Divider orientation="left">{lang2.price}</Divider>
            <Statistic
              title={lang2.price + " (VNĐ)"}
              value={formatMoney(parseInt(state.order.total_price))}
              style={{ marginTop: 10 }}
              valueStyle={{ color: "#68bd45" }}
            />
            <Divider orientation="left">---</Divider>
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
