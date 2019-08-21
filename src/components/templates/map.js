import React, { Component } from "react";
import isEmpty from "lodash.isempty";

import GoogleMap from "../organisms/googleMap";
import Marker from "../organisms/marker";

const IHTGO_CENTER = [10.7575142, 106.6602461];

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    };
  }

  componentDidMount() {
    this.fetchMarker();
    setInterval(
      function() {
        this.fetchMarker();
      }.bind(this),
      2000
    );
  }

  fetchMarker = () => {
    fetch("https://ihtgo.com.vn/api/driver/find", {
      crossDomain: true,
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => {
        data.data.map(result => {
          result.show = true;
        });
        this.setState({ places: data.data });
      });
  };

  render() {
    const { places } = this.state;
    return (
      !isEmpty(places) && (
        <GoogleMap
          style={{ height: "100%", width: "90%", position: "absolute" }}
          defaultZoom={10}
          defaultCenter={IHTGO_CENTER}
          bootstrapURLKeys={{
            key: "AIzaSyCKOI-xG8LmUxZVZEAIO-n42_qCQ312cyQ"
          }}
        >
          {places.map(place => (
            <Marker
              key={place.id}
              lat={place.lat}
              lng={place.lng}
              show={place.show}
              place={place}
            />
          ))}
        </GoogleMap>
      )
    );
  }
}

export default Map;
