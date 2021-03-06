import React, { useState, useEffect } from "react";
import {
  Input,
  Divider,
  Checkbox,
  Row,
  Button,
  Alert,
  Icon,
  Statistic,
  Tooltip
} from "antd";
import { PriceListCarousel } from "../atoms";
import DynamicImport from "../../utils/lazyImport";
import { useGlobalState, dispatch } from "../../Store";
import { SET_ORDER_INFO, SET_SOURCE_LOCATION } from "../../utils/actions";
import Geocode from "react-geocode";
import languages from "../../utils/languages";
const lang = languages("booking");
Geocode.setApiKey("AIzaSyBaumnHkYRqgqAIx3u1KFFu7N7LjdjJjAI");

const LocationInput = DynamicImport(() => import("../organisms/locationInput"));

const BD = "bình dương";
const _BD = "binh duong";
const DN = "đồng nai";
const _DN = "dong nai";
const DH = "đức hòa";
const _DH = "duc hoa";
const HCM = "hồ chí minh";
const _HCM = "ho chi minh";

const _50K = 50000;
const _100K = 100000;
const _7K = 7000;
const _3K5 = 3500;
const _70K = 70000;
const _140K = 140000;
const _1K = 1000;
const _10K = 10000;
const _250K = 250000;

const formatMoney = money => {
  return money ? parseInt(money / 1000) * 1000 : 0;
};

const BookingForm = props => {
  const [state, setState] = useState({
    address: "",
    sourceInvalid: false,
    desInvalid: false,
    sizeInvalid: false,
    weightInvalid: false
  });

  const [orderInfo] = useGlobalState("orderInfo");
  const [sourceLocation] = useGlobalState("sourceLocation");
  const [desLocation] = useGlobalState("desLocation");

  useEffect(() => {
    showCurrentLocation();
  }, []);

  const showCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        Geocode.fromLatLng(
          position.coords.latitude,
          position.coords.longitude
        ).then(
          response => {
            const address = response.results[0].formatted_address;
            dispatch({
              type: SET_SOURCE_LOCATION,
              location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                place: address
              }
            });
          },
          error => {
            console.error(error);
          }
        );
      });
    }
  };

  const isValid = () => {
    let isValid = true;
    let validate = {
      sourceInvalid: false,
      desInvalid: false,
      sizeInvalid: false,
      weightInvalid: false
    };

    if (!sourceLocation.lat || !sourceLocation.lng || !sourceLocation.place) {
      validate.sourceInvalid = true;
      isValid = false;
    }
    if (!desLocation.lat || !desLocation.lng || !desLocation.place) {
      validate.desInvalid = true;
      isValid = false;
    }

    if (!orderInfo.isDocument) {
      if (!orderInfo.weight) {
        validate.weightInvalid = true;
        isValid = false;
      }
    }

    setState({
      ...state,
      ...validate
    });
    return isValid;
  };

  const isDocumentValid = () => {
    let isValid = true;
    let validate = {
      sourceInvalid: false,
      desInvalid: false,
      sizeInvalid: false,
      weightInvalid: false
    };

    if (!sourceLocation.lat || !sourceLocation.lng || !sourceLocation.place) {
      validate.sourceInvalid = true;
      isValid = false;
    }
    if (!desLocation.lat || !desLocation.lng || !desLocation.place) {
      validate.desInvalid = true;
      isValid = false;
    }

    setState({
      ...state,
      ...validate
    });
    return isValid;
  };

  const setOrder = data => {
    dispatch({
      type: SET_ORDER_INFO,
      order: {
        ...data
      }
    });
  };

  const documentCalc = () => {
    if (isDocumentValid()) {
      const sPlace = sourceLocation.place.toLowerCase();
      const dPlace = desLocation.place.toLowerCase();
      if (
        ((sPlace.includes(BD) ||
          sPlace.includes(_BD) ||
          sPlace.includes(HCM) ||
          sPlace.includes(_HCM)) &&
          (dPlace.includes(BD) ||
            dPlace.includes(_BD) ||
            dPlace.includes(HCM) ||
            dPlace.includes(_HCM))) ||
        ((sPlace.includes(DH) ||
          sPlace.includes(_DH) ||
          sPlace.includes(HCM) ||
          sPlace.includes(_HCM)) &&
          (dPlace.includes(DH) ||
            dPlace.includes(_DH) ||
            dPlace.includes(HCM) ||
            dPlace.includes(_HCM))) ||
        ((sPlace.includes(DN) ||
          sPlace.includes(_DN) ||
          sPlace.includes(HCM) ||
          sPlace.includes(_HCM)) &&
          (dPlace.includes(DN) ||
            dPlace.includes(_DN) ||
            dPlace.includes(HCM) ||
            dPlace.includes(_HCM)) &&
          orderInfo.distance < 21)
      ) {
        return _70K;
      } else {
        return _140K;
      }
    }
  };

  const priceCalc = () => {
    if (isValid()) {
      let price = 0;
      let weight = 0;
      if (orderInfo.isDocument) {
        price = documentCalc();
      } else {
        if (!orderInfo.height || !orderInfo.len || !orderInfo.width) {
          weight = orderInfo.weight;
        } else {
          const tempW =
            (orderInfo.len * orderInfo.width * orderInfo.height) / 5000.0;
          weight = tempW > orderInfo.weight ? tempW : orderInfo.weight;
        }

        //BIKE
        if (
          weight < 21 &&
          (!orderInfo.len || orderInfo.len < 41) &&
          (!orderInfo.width || orderInfo.width < 31) &&
          (!orderInfo.height || orderInfo.height < 41)
        ) {
          if (orderInfo.distance < 26) price = _70K;
          else {
            price = _3K5 * orderInfo.distance;
          }
          console.log("xe may");
        }
        //TRUCK
        else {
          let extDistances = (orderInfo.distance - 35) * _7K;
          let extWeights = weight - 30;

          extDistances = extDistances < 0 ? 0 : extDistances;

          if (extWeights < 0) extWeights = 0;
          else if (extWeights < 50) extWeights = extWeights * 3000;
          else if (extWeights >= 50 && extWeights < 101)
            extWeights = extWeights * 2000;
          else if (extWeights) extWeights = extWeights * _1K;

          price = _250K + extDistances + extWeights;
          console.log("xe tai");
        }
      }
      //check options
      if (orderInfo.isSpeed) price *= 2;
      if (orderInfo.isHandOn) price += _10K;
      // if (parseInt(orderInfo.cod) > 1000) price += _10K;
      if (!orderInfo.isDocument) {
        if (weight > 50 && weight < 151) price += _50K;
        else if (weight > 150 && weight < 301) price += _100K;
        else if (weight > 300) price = price + _100K + (weight - 50) * _1K;
      }
      console.log("price = " + price);
      dispatch({
        type: SET_ORDER_INFO,
        order: {
          totalPrice: Math.ceil(price)
        }
      });
    } else {
      dispatch({
        type: SET_ORDER_INFO,
        order: {
          totalPrice: null
        }
      });
    }
  };

  const inputChange = (name, value) => {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      if (name === "len") setOrder({ len: value });
      else if (name === "width") setOrder({ width: value });
      else if (name === "height") setOrder({ height: value });
      else if (name === "weight") setOrder({ weight: value });
      else if (name === "cod") setOrder({ cod: value });
    }
  };

  const toNextPage = () => {
    if (isValid()) {
      priceCalc();
      props.next();
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f6f6f6",
        height: window.innerHeight
      }}
    >
      <PriceListCarousel />
      <div
        style={{
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <Divider orientation="left">{lang.sender_add}</Divider>
        {state.sourceInvalid && (
          <Alert message={lang.sender_add} type="error" showIcon banner />
        )}
        <LocationInput />
        <Divider orientation="left">{lang.receive_add}</Divider>
        {state.desInvalid && (
          <Alert message={lang.receive_add} type="error" showIcon banner />
        )}
        <LocationInput destination />

        <Divider orientation="left">{lang.order_info}</Divider>
        {!orderInfo.isInventory && (
          <Tooltip title={lang.document_tt}>
            <Checkbox
              checked={orderInfo.isDocument}
              onChange={e => {
                if (e.target.checked) {
                  priceCalc();
                  setOrder({
                    isDocument: e.target.checked,
                    totalPrice: documentCalc()
                  });
                } else setOrder({ isDocument: e.target.checked });
              }}
            >
              {lang.document}
            </Checkbox>
          </Tooltip>
        )}
        {!orderInfo.isDocument && (
          <Tooltip title={lang.map_tt}>
            <Input
              addonBefore={lang.distance}
              style={{ width: "100%", marginBottom: 10, marginTop: 10 }}
              value={orderInfo.distance}
              addonAfter="km"
              readOnly
            />
          </Tooltip>
        )}

        {!orderInfo.isDocument && (
          <>
            {state.sizeInvalid && (
              <Alert message={lang.size_err} type="error" showIcon banner />
            )}
            <Input.Group compact style={{ marginBottom: 10 }}>
              <Input
                allowClear
                style={{ width: "30%" }}
                placeholder={lang.length}
                value={orderInfo.len}
                onChange={e => inputChange("len", e.target.value)}
              />
              <Input
                allowClear
                style={{ width: "30%" }}
                placeholder={lang.width}
                value={orderInfo.width}
                onChange={e => inputChange("width", e.target.value)}
              />

              <Input
                allowClear
                style={{ width: "40%" }}
                placeholder={lang.height}
                addonAfter="cm"
                value={orderInfo.height}
                onChange={e => inputChange("height", e.target.value)}
              />
            </Input.Group>
          </>
        )}

        {!orderInfo.isDocument && (
          <>
            {state.weightInvalid && (
              <Alert message={lang.wei_err} type="error" showIcon banner />
            )}
            <Tooltip title={lang.wei_tt}>
              <Input
                allowClear
                style={{ width: "100%" }}
                placeholder={lang.weight}
                addonAfter="kg"
                value={orderInfo.weight}
                onChange={e => inputChange("weight", e.target.value)}
              />
            </Tooltip>
          </>
        )}
        <Divider orientation="left">{lang.option}</Divider>
        {!orderInfo.isInventory && (
          <Row>
            <Tooltip title={lang.handon_tt}>
              <Checkbox
                checked={orderInfo.isHandOn ? true : false}
                onChange={e => setOrder({ isHandOn: e.target.checked })}
              >
                {lang.handon}
              </Checkbox>
            </Tooltip>
            <Tooltip title={lang.speed_tt}>
              <Checkbox
                checked={orderInfo.isSpeed ? true : false}
                onChange={e => setOrder({ isSpeed: e.target.checked })}
              >
                {lang.speed}
              </Checkbox>
            </Tooltip>
            {/* {!orderInfo.isDocument && (
              <Checkbox
                checked={orderInfo.isDischarge ? true : false}
                onChange={e => setOrder({ isDischarge: e.target.checked })}
              >
                Bốc xếp hộ
              </Checkbox>
            )} */}
            {!orderInfo.isDocument && (
              <Tooltip title={lang.market_tt}>
                <Checkbox
                  checked={orderInfo.isInventory ? true : false}
                  onChange={e => setOrder({ isInventory: e.target.checked })}
                >
                  {lang.market}
                </Checkbox>
              </Tooltip>
            )}
          </Row>
        )}
        {!orderInfo.isInventory && (
          <Input
            allowClear
            style={{ marginTop: 10 }}
            addonBefore={lang.cod}
            placeholder={lang.cod_price}
            addonAfter="VNĐ"
            value={orderInfo.cod}
            onChange={e => inputChange("cod", e.target.value)}
          />
        )}
        <Statistic
          title={
            <Row>
              {lang.price} (VNĐ)
              {"   "}
              <Button size="small" onClick={priceCalc} type="danger">
                {lang.calc}
              </Button>
            </Row>
          }
          value={formatMoney(orderInfo.totalPrice)}
          style={{ marginTop: 10 }}
          valueStyle={{ color: "#68bd45" }}
        />

        <Button
          style={{ width: "100%", margin: "20px 0" }}
          size="large"
          type="danger"
          onClick={toNextPage}
        >
          <b>
            {lang.continue} <Icon type="right" />
          </b>
        </Button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default BookingForm;
