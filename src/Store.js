import { applyMiddleware } from "redux";
import { createStore } from "react-hooks-global-state";
import reducer from "./reducers";

const initialState = {
  sourceLocation: {
    lat: null,
    lng: null,
    place: null
  },
  desLocation: {
    lat: null,
    lng: null,
    place: null
  },
  orderInfo: {
    name: null,
    distance: null,
    height: null,
    width: null,
    weight: null,
    len: null,
    isSpeed: false,
    isHandOn: false,
    isDischarge: false,
    isInventory: false,
    totalPrice: null,
    sender_name: null,
    sender_phone: null,
    receiver_name: null,
    receiver_phone: null,
    note: null,
    coupon_code: null,
    cod: null
  }
};

var logger = function(_a) {
  var getState = _a.getState;
  return function(next) {
    return function(action) {
      console.log("will dispatch", action);
      var returnValue = next(action);
      console.log("state after dispatch", getState());
      return returnValue;
    };
  };
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  applyMiddleware(logger)
);
