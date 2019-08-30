import React from "react";
import PropTypes from "prop-types";
import { message } from "antd";

const InfoWindow = props => {
  const { place } = props;
  const infoWindowStyle = {
    position: "relative",
    bottom: 70,
    left: "-10px",
    width: 50,
    backgroundColor: "white",
    boxShadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)",
    padding: 10,
    fontSize: 14,
    zIndex: 100,
    borderRadius: 5
  };

  return (
    <div
      style={infoWindowStyle}
      onClick={() => message.info(place.name + " - " + place.updated_at)}
    >
      <div style={{ fontSize: 12 }}>{place.id}</div>
    </div>
  );
};

InfoWindow.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.array,
    price_level: PropTypes.number,
    opening_hours: PropTypes.object
  }).isRequired
};

export default InfoWindow;
