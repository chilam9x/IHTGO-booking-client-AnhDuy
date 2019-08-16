import React, { useEffect, useState, useRef } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { message } from "antd";

const GettingStartedGoogleMap = withScriptjs(
  withGoogleMap(props => {
    const directionsRef = useRef(null);

    const [state, setState] = useState({
      directions: {
        origin: [10.7575142, 106.6602461],
        destination: [10.7439256, 106.6312543]
      }
    });

    const initRoute = () => {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(...state.directions.origin),
          destination: new window.google.maps.LatLng(
            ...state.directions.destination
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    };

    useEffect(() => {
      initRoute();
    }, []);

    return (
      <GoogleMap
        defaultZoom={3}
        defaultCenter={new window.google.maps.LatLng(41.85073, -87.65126)}
      >
        {state.directions && (
          <DirectionsRenderer
            ref={directionsRef}
            directions={state.directions}
            options={{ draggable: true }}
            onDirectionsChanged={() => {
              const currentDirections =
                directionsRef.current.state
                  .__SECRET_DIRECTIONS_RENDERER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
                  .directions.routes[0].legs[0];
              const payment = parseInt(currentDirections.distance.text) * 4000;
              message.info(
                "Số km tạm tính = " +
                  currentDirections.distance.text +
                  " tổng tiền = " +
                  payment +
                  "VND"
              );
            }}
          />
        )}
      </GoogleMap>
    );
  })
);

const CustomerMap = () => {
  return (
    <GettingStartedGoogleMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCap6yvwVBHnEv1mfJdyvK__A7nTXOkHLY&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: "1000px" }} />}
      containerElement={<div style={{ height: "1000px" }} />}
      mapElement={<div style={{ height: "1000px" }} />}
    />
  );
};

export default CustomerMap;
