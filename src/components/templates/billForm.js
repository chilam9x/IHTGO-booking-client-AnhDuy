import React, { useRef } from "react";
import {
  Descriptions,
  Modal,
  Button,
  Icon,
  Divider,
  Avatar,
  Typography
} from "antd";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";

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
              In hóa đơn
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
          <Avatar
            shape="square"
            size={80}
            src="https://ihtgo.com.vn/public/Images/Index/logo.png"
          />{" "}
          <b>IHTGO Express</b>
        </Typography.Title>
        <Divider orientation="left">Thông tin người gửi</Divider>
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<Icon type="user" />} span={2}>
            {props.data.sender_name}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="phone" />} span={1}>
            {props.data.sender_phone}
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="home" />} span={3}>
            {props.data.sender_address}
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Thông tin người nhận</Divider>
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<Icon type="user" />} span={2}>
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
          <Descriptions.Item label="Quãng đường" span={1}>
            {props.data.distance && props.data.distance + " km"}
          </Descriptions.Item>
          <Descriptions.Item label="Kích thước" span={1}>
            {getSize()}
          </Descriptions.Item>
          <Descriptions.Item label="Cân nặng" span={1}>
            {props.data.weight && props.data.weight + " kg"}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Tận tay" span={1}>
            {props.data.hand_on ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Hỏa tốc" span={1}>
            {props.data.is_speed ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Hàng siêu thị" span={2}>
            {props.data.car_option === 4 ? "Có" : "Không"}
          </Descriptions.Item>
          <Descriptions.Item label="Thu hộ" span={1}>
            {props.data.take_money ? props.data.take_money + " vnđ" : "0 vnđ"}
          </Descriptions.Item>
          <Descriptions.Item label="Người trả phí" span={1}>
            {props.data.payer === 1 ? "Người nhận" : "Người gửi"}
          </Descriptions.Item>
          <Descriptions.Item label="Tiền cước" span={2}>
            {props.data.total_price} vnđ
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          layout="vertical"
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Quét mã" span={1}>
            <QRCode value={String(props.data.code)} size={100} />
          </Descriptions.Item>
          <Descriptions.Item label="Chữ ký 2" span={1}></Descriptions.Item>
          <Descriptions.Item label="Chữ ký 3" span={1}></Descriptions.Item>
          <Descriptions.Item label="Chữ ký 3" span={1}></Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph>{props.data.note}</Typography.Paragraph>
      </div>
    </Modal>
  );
};

export default BillForm;
