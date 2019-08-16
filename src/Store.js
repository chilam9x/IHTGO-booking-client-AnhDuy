import { applyMiddleware } from "redux";
import { createStore } from "react-hooks-global-state";
import reducer from "./reducers";
import { SENDER } from "./utils/constants";

const initialState = {
  orderInfo: {
    lat: 0,
    lng: 0,
    name: "unknown",
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
    distance: 0,
    cod: 0,
    payer: SENDER,
    note: "",
    handOn: false,
    isSpeed: false,
    discharge: false,
    inventory: false
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
