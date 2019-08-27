import { applyMiddleware } from "redux";
import { createStore } from "react-hooks-global-state";
import reducer from "./reducers";
import { ALL } from "./utils/constants";

const initialState = {
  sourceLocation: {},
  desLocation: {},
  orderInfo: {},
  orderList: { current_option: ALL },
  sideBar: { key: "1" }
};

var logger = function(_a) {
  var getState = _a.getState;
  return function(next) {
    return function(action) {
      // console.log("will dispatch", action);
      var returnValue = next(action);
      // console.log("state after dispatch", getState());
      return returnValue;
    };
  };
};

export const { GlobalStateProvider, dispatch, useGlobalState } = createStore(
  reducer,
  initialState,
  applyMiddleware(logger)
);
