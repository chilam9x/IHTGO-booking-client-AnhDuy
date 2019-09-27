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
  return (
    <Modal
      style={{ top: 10 }}
      visible={props.visible}
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
          //bordered
          size="small"
          column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<Icon type="user" />} span={2}>
            thằng lãm
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="phone" />} span={1}>
            11111111111111
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="home" />} span={3}>
            113/23 Ngô Quyền, Phường 12, Quận 5, Hồ Chí Minh, Vietnam
          </Descriptions.Item>
        </Descriptions>
        <Divider orientation="left">Thông tin người nhận</Divider>
        <Descriptions
          //bordered
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label={<Icon type="user" />} span={2}>
            thằng lãm
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="phone" />} span={1}>
            11111111111111
          </Descriptions.Item>
          <Descriptions.Item label={<Icon type="home" />} span={3}>
            113/23 Ngô Quyền, Phường 12, Quận 5, Hồ Chí Minh, Vietnam
          </Descriptions.Item>
        </Descriptions>
        <hr />
        <Descriptions
          //bordered
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Quãng đường" span={1}>
            500km
          </Descriptions.Item>
          <Descriptions.Item label="Kích thước" span={1}>
            100x100x100
          </Descriptions.Item>
          <Descriptions.Item label="Cân nặng" span={1}>
            1000
          </Descriptions.Item>
        </Descriptions>
        <Descriptions
          // //bordered
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Tận tay" span={1}>
            Không
          </Descriptions.Item>
          <Descriptions.Item label="Hỏa tốc" span={1}>
            Không
          </Descriptions.Item>
          <Descriptions.Item label="Hàng siêu thị" span={2}>
            Không
          </Descriptions.Item>
          <Descriptions.Item label="Thu hộ" span={1}>
            10,000,000đ
          </Descriptions.Item>
          <Descriptions.Item label="Người trả phí" span={1}>
            người nhận
          </Descriptions.Item>
          <Descriptions.Item label="Tiền cước" span={2}>
            10,000,000đ
          </Descriptions.Item>
        </Descriptions>
        <hr />
        <Descriptions
          layout="vertical"
          // //bordered
          size="small"
          column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
        >
          <Descriptions.Item label="Quét mã" span={1}>
            <QRCode value={"Quét thử bằng barcode"} size={100} />
          </Descriptions.Item>
          <Descriptions.Item label="Chữ ký 2" span={1}></Descriptions.Item>
          <Descriptions.Item label="Chữ ký 3" span={1}></Descriptions.Item>
          <Descriptions.Item label="Chữ ký 3" span={1}></Descriptions.Item>
        </Descriptions>
        <Typography.Paragraph>
          Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nè
          Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nèGhi
          chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nèGhi chú
          ở đây nè Ghi chú ở đây nè Ghi chú ở đây nè Ghi chú ở đây nèGhi chú ở
          đây nè
        </Typography.Paragraph>
      </div>
    </Modal>
  );
};

export default BillForm;
