import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, Spin, Alert } from "antd";
import { dispatch, useGlobalState } from "../../Store";
import { SET_SOURCE_LOCATION } from "../../utils/actions";

const SourceLocationInput = props => {
  const [location] = useGlobalState("sourceLocation");

  const [state, setState] = useState({
    address: ""
  });

  const handleChange = address => {
    setState({ ...state, address });
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        setState({ ...state, address: results[0].formatted_address });
        getLatLng(results[0]);
        console.log(results[0]);
      })
      .then(latLng => {
        console.log(latLng);
      })
      .catch(error => console.error("Error", error));
  };

  return (
    <>
      <Alert
        message="Vui lòng nhập đầy đủ thông tin"
        type="error"
        showIcon
        closable
      />
      <PlacesAutocomplete
        value={state.address}
        // onChange={handleChange}
        onSelect={handleSelect}
        googleCallbackName="initOne"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              allowClear
              {...getInputProps({
                placeholder: "Điểm nhận hàng"
              })}
            />
            {loading ? (
              <Spin />
            ) : (
              <div
                style={{
                  border: "1px solid #ccc",
                  borderTop: "none"
                }}
              >
                {suggestions.map(suggestion => {
                  const style = suggestion.active
                    ? { backgroundColor: "#ccc", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      onClick={handleSelect}
                      {...getSuggestionItemProps(suggestion, {
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default SourceLocationInput;
