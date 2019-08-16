import React, { useState, useEffect } from "react";
import { Descriptions, Icon, Skeleton } from "antd";

const OrderDescription = props => {
  const [state, setState] = useState({
    loading: true
  });

  useEffect(() => {
    setTimeout(() => {
      setState({
        ...state,
        loading: false
      });
    }, 3000);
  }, [state]);

  return state.loading ? (
    <Skeleton active paragraph={{ rows: 4 }} title={false} />
  ) : (
    <Descriptions
      title={
        <>
          tên đơn hàng
          <Icon
            type="rocket"
            style={{ fontSize: 40, color: "red" }}
            rotate={45}
          />
        </>
      }
      bordered
    >
      <Descriptions.Item label="Mã đơn hàng">Zhou Maomao</Descriptions.Item>

      <Descriptions.Item label="Loại xe">1</Descriptions.Item>
      <Descriptions.Item label="Người thanh toán">2</Descriptions.Item>
      <Descriptions.Item label="Nhà kho">3</Descriptions.Item>
      <Descriptions.Item label="Loại đơn">4</Descriptions.Item>
      <Descriptions.Item label="Tổng tiền">5</Descriptions.Item>
      <Descriptions.Item label="Cân nặng">6</Descriptions.Item>
      <Descriptions.Item label="Thu hộ">7</Descriptions.Item>
      <Descriptions.Item label="Phương thức thanh toán">8</Descriptions.Item>
      <Descriptions.Item label="Thanh toán">9</Descriptions.Item>
      <Descriptions.Item label="Ghi chú của khách hàng">10</Descriptions.Item>
      <Descriptions.Item label="Ghi chú của admin (nếu có)">
        11
      </Descriptions.Item>
    </Descriptions>
  );
};

export default OrderDescription;
