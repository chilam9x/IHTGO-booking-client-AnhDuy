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
    fetch("http://api.ihtgo.com.vn/find")
      .then(response => response.json())
      .then(data => {
        data.forEach(result => {
          result.show = true;
        });
        this.setState({ places: data });
      });
  };

  handleApiLoaded = (map, maps) => {
    // use map and maps objects
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
            key: "AIzaSyDNWwflFjXv5leyqg8tIYAHA5maszdokig"
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
        >
          {places.map(place => (
            <Marker
              key={place.user_id}
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
