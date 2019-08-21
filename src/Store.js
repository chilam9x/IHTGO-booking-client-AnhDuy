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
    height: 1,
    width: 1,
    weight: null,
    len: 1,
    isSpeed: false,
    isHandOn: false,
    isDischarge: false,
    isInventory: false,
    totalPrice: 0
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
