import React from "react";
import InfoWindow from "./infoWindow";
import PropTypes from "prop-types";

const Marker = props => {
  return props.show && <InfoWindow place={props.place} />;
};

Marker.propTypes = {
  show: PropTypes.bool.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string,
    formatted_address: PropTypes.string,
    rating: PropTypes.number,
    types: PropTypes.array,
    price_level: PropTypes.number,
    opening_hours: PropTypes.object
  }).isRequired
};

export default Marker;
