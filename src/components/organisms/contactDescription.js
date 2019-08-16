import React, { useState, useEffect } from "react";
import { Descriptions, Skeleton } from "antd";

const ContactDescription = props => {
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
  });

  return (
    <Skeleton active paragraph={{ rows: 1 }} loading={state.loading}>
      <Descriptions title={props.name}>
        <Descriptions.Item label="Số điện thoại">
          {props.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">{props.address}</Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">{props.date}</Descriptions.Item>
      </Descriptions>
    </Skeleton>
  );
};

export default ContactDescription;
