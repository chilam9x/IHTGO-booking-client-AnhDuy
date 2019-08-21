import React, { useState } from "react";
import { Input } from "antd";
import Geocode from "react-geocode";
import { SET_SOURCE_LOCATION, SET_DES_LOCATION } from "../../utils/actions";
import { dispatch, useGlobalState } from "../../Store";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/BarLoader";

Geocode.setApiKey("AIzaSyCKOI-xG8LmUxZVZEAIO-n42_qCQ312cyQ");

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  width: 100%;
  height: 5px;
`;

const LocationInput = props => {
  const [location] = useGlobalState(
    props.destination ? "desLocation" : "sourceLocation"
  );
  const [state, setState] = useState({
    isLoading: false
  });

  const getLocationFromAddress = address => {
    setState({
      ...state,
      isLoading: true
    });
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        dispatch({
          type: props.destination ? SET_DES_LOCATION : SET_SOURCE_LOCATION,
          location: {
            lat,
            lng,
            place: response.results[0].formatted_address
          }
        });

        setState({
          ...state,
          isLoading: false
        });
      },
      error => {
        console.error(error);
        setState({
          ...state,
          isLoading: false
        });
      }
    );
  };

  const changeInput = e => {
    dispatch({
      type: props.destination ? SET_DES_LOCATION : SET_SOURCE_LOCATION,
      location: {
        place: e.target.value
      }
    });
  };

  return (
    <>
      <ClipLoader
        css={override}
        sizeUnit={"px"}
        size={150}
        color={"red"}
        loading={state.isLoading}
      />
      {!state.isLoading && (
        <Input.Search
          allowClear
          placeholder={
            props.destination ? "nhập điểm trả hàng" : "nhập điểm nhận hàng"
          }
          onSearch={getLocationFromAddress}
          onChange={changeInput}
          value={location.place}
        />
      )}
    </>
  );
};

export default LocationInput;
