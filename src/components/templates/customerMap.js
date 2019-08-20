import React, { useEffect, useState, useRef } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { message } from "antd";
import { useGlobalState, dispatch } from "../../Store";
import {
  SET_ORDER_INFO,
  SET_SOURCE_LOCATION,
  SET_DES_LOCATION
} from "../../utils/actions";

const GettingStartedGoogleMap = withScriptjs(
  withGoogleMap(props => {
    const directionsRef = useRef(null);

    const [sourceLocation] = useGlobalState("sourceLocation");
    const [desLocation] = useGlobalState("desLocation");

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
          origin: new window.google.maps.LatLng(
            sourceLocation.lat,
            sourceLocation.lng
          ),
          destination: new window.google.maps.LatLng(
            desLocation.lat,
            desLocation.lng
          ),
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            console.log(result);
            setState({
              directions: result
            });
            dispatch({
              type: SET_ORDER_INFO,
              order: {
                distance: result.routes[0].legs[0].distance.value / 1000.0
              }
            });
          } else {
            console.error(result);
          }
        }
      );
    };

    useEffect(() => {
      initRoute();
    }, [sourceLocation.lat, desLocation.lat]);

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
                  .directions;
              const distance =
                currentDirections.routes[0].legs[0].distance.value / 1000.0;
              dispatch({
                type: SET_SOURCE_LOCATION,
                location: {
                  place: currentDirections.routes[0].legs[0].start_address
                }
              });

              dispatch({
                type: SET_DES_LOCATION,
                location: {
                  place: currentDirections.routes[0].legs[0].end_address
                }
              });

              dispatch({
                type: SET_ORDER_INFO,
                order: {
                  distance: distance
                }
              });

              message.info("Quãng đường = " + distance + " km");
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
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCKOI-xG8LmUxZVZEAIO-n42_qCQ312cyQ&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: window.innerHeight }} />}
      containerElement={<div style={{ height: window.innerHeight }} />}
      mapElement={<div style={{ height: window.innerHeight }} />}
    />
  );
};

export default CustomerMap;
