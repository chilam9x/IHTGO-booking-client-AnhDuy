import React, { useState } from "react";
import DynamicImport from "../../utils/lazyImport";
import { Layout, Affix, Select, Steps, Result } from "antd";
import { useGlobalState } from "../../Store";
import ClipLoader from "react-spinners/ScaleLoader";

const { Content, Sider } = Layout;
const { Option } = Select;
const { Step } = Steps;

const Map = DynamicImport(() => import("../templates/customerMap"));
const PlaceSuggestion = DynamicImport(() => import("../templates/bookingForm"));
const OrderConfirm = DynamicImport(() => import("../templates/orderConfirm"));

const steps = [
  {
    title: "Tạm tính"
  },
  {
    title: "Thêm thông tin"
  },
  {
    title: "Hoàn thành"
  }
];

const Main = () => {
  const [state, setState] = useState({
    current: 0
  });

  const [sourceLocation] = useGlobalState("sourceLocation");
  const [desLocation] = useGlobalState("desLocation");

  const next = () => {
    const current = state.current + 1;
    setState({ ...state, current });
  };

  const prev = () => {
    const current = state.current - 1;
    setState({ ...state, current });
  };

  const reset = () => {
    setState({ ...state, current: 0 });
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
          style={{ margin: "20px -20px" }}
        >
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {state.current === 0 ? (
            <PlaceSuggestion next={next} />
          ) : state.current === 1 ? (
            <OrderConfirm next={next} prev={prev} />
          ) : state.current === 2 ? (
            <OrderConfirm finish reset={reset} />
          ) : (
            <PlaceSuggestion next={next} />
          )}
        </div>
      </Sider>
      <Content style={{ minHeight: 280 }}>
        {sourceLocation.lat &&
        sourceLocation.lng &&
        desLocation.lat &&
        desLocation.lng ? (
          <>
            {/* <Affix
              offsetTop={10}
              style={{ position: "absolute", marginLeft: 5 }}
            >
              <Select defaultValue="hcm" style={{ width: 180 }} size="large">
                <Option value="hcm">Hồ Chí Minh</Option>
                <Option value="bd">Bình Dương</Option>
                <Option value="la">Long An</Option>
                <Option value="dn">Đồng Nai</Option>
              </Select>
            </Affix> */}
            <Map />
          </>
        ) : (
          <Result
            title={
              <>
                Vị trí chưa xác định <br />
                Vui lòng nhập đầy đủ thông tin để xác định vị trí!
              </>
            }
            extra={
              <ClipLoader
                sizeUnit={"px"}
                size={100}
                color={"#ccc"}
                loading={true}
              />
            }
          />
        )}
      </Content>
    </Layout>
  );
};

export default Main;
