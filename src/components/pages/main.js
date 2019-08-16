import React, { useState } from "react";
import DynamicImport from "../../utils/lazyImport";
import {
  Layout,
  Menu,
  Breadcrumb,
  Statistic,
  Card,
  Row,
  Col,
  Icon,
  Affix,
  Select,
  Carousel,
  Button,
  Steps,
  Input
} from "antd";

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Step } = Steps;

const Map = DynamicImport(() => import("../templates/customerMap"));
const PlaceSuggestion = DynamicImport(() =>
  import("../templates/placeSuggestion")
);
const OrderConfirm = DynamicImport(() => import("../templates/orderConfirm"));

const steps = [
  {
    title: "Tạm tính"
  },
  {
    title: "Thêm thông tin"
  },
  {
    title: "Xác nhận"
  }
];

const Main = () => {
  const [state, setState] = useState({
    current: 0
  });
  const next = () => {
    const current = state.current + 1;
    setState({ ...state, current });
  };

  const prev = () => {
    const current = state.current - 1;
    setState({ ...state, current });
  };

  return (
    <Layout
      style={{
        background: "#fff"
      }}
    >
      <Sider width="25%" theme="light">
        <Steps
          size="small"
          progressDot
          current={state.current}
          style={{ margin: "20px 0" }}
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {state.current == 0 ? (
            <PlaceSuggestion next={next} />
          ) : state.current == 1 ? (
            <OrderConfirm />
          ) : state.current == 2 ? (
            <OrderConfirm finish />
          ) : (
            <OrderConfirm finish />
          )}
        </div>
      </Sider>
      <Content style={{ minHeight: 280 }}>
        <Affix offsetTop={10} style={{ position: "absolute", marginLeft: 5 }}>
          <Select defaultValue="hcm" style={{ width: 180 }} size="large">
            <Option value="hcm">Hồ Chí Minh</Option>
            <Option value="bd">Bình Dương</Option>
            <Option value="la">Long An</Option>
            <Option value="dn">Đồng Nai</Option>
          </Select>
        </Affix>
        <Map />
      </Content>
    </Layout>
  );
};

export default Main;
