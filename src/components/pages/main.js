import React, { useState, useEffect } from "react";
import DynamicImport from "../../utils/lazyImport";
import { Layout, Steps, Result, Icon } from "antd";
import { useGlobalState } from "../../Store";
import ClipLoader from "react-spinners/ScaleLoader";
import axios from "../../utils/axios";
import languages from "../../utils/languages";
const lang = languages("booking");
const { Content, Sider } = Layout;
const { Step } = Steps;

const Map = DynamicImport(() => import("../templates/customerMap"));
const BookingForm = DynamicImport(() => import("../templates/bookingForm"));
const OrderConfirm = DynamicImport(() => import("../templates/orderConfirm"));

const steps = [
  {
    title: lang.temp
  },
  {
    title: lang.more_info
  },
  {
    title: lang.finish
  }
];

const Main = () => {
  const [state, setState] = useState({
    current: 0,
    collapsed: false
  });

  const [sourceLocation] = useGlobalState("sourceLocation");
  const [desLocation] = useGlobalState("desLocation");

  function detectmob() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    axios
      .post("customer/update-webfcm", {
        fcm: localStorage.getItem("@fcm")
      })
      .then(res => {
        console.log(res);
        if (detectmob()) {
          alert(localStorage.getItem("@fcm"));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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

  const onCollapse = () => {
    setState({ ...state, collapsed: !state.collapsed });
  };

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={
          state.collapsed ? (
            <Icon type="right" style={{ fontSize: 20 }} />
          ) : (
            <Icon type="left" style={{ fontSize: 20, width: "100px" }} />
          )
        }
        collapsible
        collapsed={state.collapsed}
        onCollapse={onCollapse}
        width={window.innerWidth / 3}
      >
        {!state.collapsed && (
          <>
            <Steps
              size="small"
              progressDot
              current={state.current}
              style={{
                padding: "20px 0",
                backgroundColor: "#f6f6f6"
              }}
            >
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              {state.current === 0 ? (
                <BookingForm next={next} />
              ) : state.current === 1 ? (
                <OrderConfirm next={next} prev={prev} />
              ) : state.current === 2 ? (
                <OrderConfirm finish reset={reset} />
              ) : (
                <BookingForm next={next} />
              )}
            </div>
          </>
        )}
      </Sider>
      <Content style={{ minHeight: window.innerHeight }}>
        {sourceLocation.lat &&
        sourceLocation.lng &&
        desLocation.lat &&
        desLocation.lng ? (
          <Map />
        ) : (
          <Result
            title={
              <>
                {lang.no_map1} <br />
                {lang.no_map2}
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
