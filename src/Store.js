import { applyMiddleware } from "redux";
import { createStore } from "react-hooks-global-state";
import reducer from "./reducers";

const initialState = {
  counter: 122,
  person: {
    name: "nad",
    age: 12
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
