import React, { useRef } from "react";
import { Descriptions, Modal, Button, Icon, Typography } from "antd";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import languages from "../../utils/languages";

const lang = languages("confirm");
const lang2 = languages("booking");

const BillForm = props => {
  const componentRef = useRef();
  const getSize = () => {
    const l = props.data.len ? props.data.len : 0;
    const w = props.data.width ? props.data.width : 0;
    const h = props.data.height ? props.data.height : 0;
    return l + "x" + w + "x" + h + "cm";
  };

  return (
    <Modal
      style={{ top: 10 }}
      visible={props.visible}
      onCancel={props.close}
      footer={[
        <ReactToPrint
          trigger={() => (
            <Button key="print" type="danger">
              <Icon type="printer" />
              {lang2.print}
            </Button>
          )}
          content={() => componentRef.current}
          pageStyle="@page { size: A5 portrait;}"
        />
      ]}
      width={600}
      bodyStyle={{ height: 800 }}
    >
      <div ref={componentRef}>
        <Typography.Title>
          <img
            style={{ height: 50 }}
            src="https://ihtgo.com.vn/public/Images/Index/logo.png"
          />{" "}
          <b>IHTGO</b>
          <QRCode
            value={String(props.data.code)}
            size={60}
            style={{ marginLeft: "40%" }}
          />
        </Typography.Title>
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={lang.sender} span={2}>
            {props.data.sender_name}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="phone" />} span={1}>
            {props.data.sender_phone}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="home" />} span={3}>
            {props.data.sender_address}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={lang.receiver} span={2}>
            {props.data.receive_name}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="phone" />} span={1}>
            {props.data.receive_phone}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="home" />} span={3}>
            {props.data.receive_address}
          </Descriptions.Item>
        </Descriptions>
        <hr />
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={lang2.distance} span={1}>
            {props.data.distance && props.data.distance + " km"}
          </Descriptions.Item>
          <Descriptions.Item
            label={lang2.length + "x" + lang2.width + "x" + lang2.height}
            span={1}
          >
            {getSize()}
          </Descriptions.Item>
          <Descriptions.Item label={lang2.weight} span={1}>
            {props.data.weight && props.data.weight + " kg"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={lang2.handon} span={1}>
            {props.data.hand_on ? lang2.yes : lang2.no}
          </Descriptions.Item>
          <Descriptions.Item label={lang2.speed} span={1}>
            {props.data.is_speed ? lang2.yes : lang2.no}
          </Descriptions.Item>
          <Descriptions.Item label={lang2.market} span={2}>
            {props.data.car_option === 4 ? lang2.yes : lang2.no}
          </Descriptions.Item>
          <Descriptions.Item label={lang2.cod} span={1}>
            {props.data.take_money ? props.data.take_money + " vnđ" : "0 vnđ"}
          </Descriptions.Item>
          <Descriptions.Item label={lang.payment} span={1}>
            {props.data.payer === 1 ? lang.receiver : lang.sender}
          </Descriptions.Item>
          <Descriptions.Item label={lang.price} span={2}>
            {props.data.total_price} vnđ
          </Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph>
          {lang.note}: {props.data.note}
        </Typography.Paragraph>
        <Descriptions
          layout="vertical"
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item
            label={lang.sign + "1"}
            span={1}
          ></Descriptions.Item>
          <Descriptions.Item
            label={lang.sign + "2"}
            span={1}
          ></Descriptions.Item>
          <Descriptions.Item
            label={lang.sign + "3"}
            span={1}
          ></Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default BillForm;
