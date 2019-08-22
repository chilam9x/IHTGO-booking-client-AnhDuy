import React from "react";
import { Result, Button, Icon, Typography } from "antd";

const { Paragraph, Text } = Typography;

const OrderError = props => {
  return (
    <Result
      status="error"
      title="Lỗi lấy chi tiết đơn hàng"
      subTitle="Vui lòng kiểm tra lại mã đơn hàng của bạn"
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16
            }}
          >
            Những nguyên nhân có thể gây lỗi:
          </Text>
        </Paragraph>
        <Paragraph>
          <Icon style={{ color: "red" }} type="close-circle" /> Mã đơn hàng
          không tồn tại
        </Paragraph>
        <Paragraph>
          <Icon style={{ color: "red" }} type="close-circle" /> Mã đơn hàng của
          người khác
        </Paragraph>
      </div>
    </Result>
  );
};

export default OrderError;
