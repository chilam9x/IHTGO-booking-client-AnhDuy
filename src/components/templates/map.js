import React, { Component } from "react";
import isEmpty from "lodash.isempty";
import GoogleMap from "../organisms/googleMap";
import Marker from "../organisms/marker";
import axios from "../../utils/axios";

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
    axios.get("driver/find").then(data => {
      data.data.data.forEach(result => {
        result.show = true;
      });
      this.setState({ places: data.data.data });
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
            key: "AIzaSyBaumnHkYRqgqAIx3u1KFFu7N7LjdjJjAI"
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
