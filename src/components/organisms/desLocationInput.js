import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import { Input, Spin } from "antd";

const DesLocationInput = props => {
  const [state, setState] = useState({
    address: ""
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

  return (
    <PlacesAutocomplete
      value={state.address}
      onChange={handleChange}
      onSelect={handleSelect}
      googleCallbackName="initTwo"
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
  );
};

export default DesLocationInput;
