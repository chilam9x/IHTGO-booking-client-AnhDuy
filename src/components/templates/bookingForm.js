import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Input,
  Spin,
  Divider,
  Checkbox,
  Row,
  Button,
  Alert,
  Icon,
  Statistic,
  Switch
} from "antd";
import { PriceListCarousel } from "../atoms";
import DynamicImport from "../../utils/lazyImport";
import scriptLoader from "react-async-script-loader";

const SourceLocationInput = DynamicImport(() =>
  import("../organisms/sourceLocationInput")
);

const DesLocationInput = DynamicImport(() =>
  import("../organisms/desLocationInput")
);

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const BookingForm = props => {
  const [state, setState] = useState({
    address: "",
    isDocument: false
  });

  const handleChange = address => {
    setState({ ...state, address });
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  const next = () => {
    props.next();
  };

  const changeOrderType = () => {
    setState({
      ...state,
      isDocument: !state.isDocument
    });
  };

  return (
    <>
      <PriceListCarousel />
      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Divider orientation="left">Chọn lộ trình</Divider>
        <SourceLocationInput />
        <br />
        {/* <DesLocationInput /> */}
        <Divider orientation="left">Thông số đơn hàng</Divider>
        <Switch
          checkedChildren="Giao chứng từ"
          unCheckedChildren="Giao hàng hóa"
          checked={state.isDocument}
          onClick={changeOrderType}
        />
        <Input
          addonBefore="Lộ trình giao hàng"
          style={{ width: "100%", marginBottom: 10, marginTop: 10 }}
          value={10}
          addonAfter="km"
          disabled
        />

        {!state.isDocument && (
          <>
            <Alert
              message="Vui lòng nhập đầy đủ thông tin"
              type="error"
              showIcon
              closable
            />
            <Input.Group compact style={{ marginBottom: 10 }}>
              <Input allowClear style={{ width: "30%" }} placeholder="Dài" />
              <Input allowClear style={{ width: "30%" }} placeholder="Rộng" />
              <Input
                allowClear
                style={{ width: "40%" }}
                placeholder="Cao"
                addonAfter="cm"
              />
            </Input.Group>
          </>
        )}

        {!state.isDocument && (
          <>
            <Alert
              message="Vui lòng nhập đầy đủ thông tin"
              type="error"
              showIcon
              closable
            />
            <Input
              allowClear
              style={{ width: "100%" }}
              placeholder="Cân nặng"
              addonAfter="kg"
            />
          </>
        )}
        <Divider orientation="left">Tùy chọn thêm</Divider>
        <Row>
          <Checkbox>Giao tận tay</Checkbox>
          <Checkbox>Giao hỏa tốc</Checkbox>
          {!state.isDocument && <Checkbox>Bốc xếp hộ</Checkbox>}
        </Row>
        <br />
        <Row>{!state.isDocument && <Checkbox>Làm hàng siêu thị</Checkbox>}</Row>
        {/* <Divider orientation="left">Ghi chú</Divider>
        <Input.TextArea
          placeholder="Ghi chú của khách hàng"
          autosize={{ minRows: 2, maxRows: 6 }}
        /> */}
        <br />
        <Statistic
          title="Cước phí tạm tính (VND)"
          value={formatter.format(112893)}
          style={{ marginTop: 10 }}
          valueStyle={{ color: "#68bd45" }}
        />
        <Button
          style={{ width: "100%", marginTop: 10 }}
          size="large"
          type="danger"
          onClick={next}
        >
          <b>
            Tiếp tục đơn hàng <Icon type="right" />
          </b>
        </Button>
      </div>
    </>
  );
};

export default BookingForm;
