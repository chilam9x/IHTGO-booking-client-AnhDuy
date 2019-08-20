import { combineReducers } from "redux";
import sourceLocation from "./sourceLocation";
import desLocation from "./desLocation";
import orderInfo from "./orderInfo";

const reducer = combineReducers({
  sourceLocation: sourceLocation,
  desLocation: desLocation,
  orderInfo: orderInfo
});

export default reducer;
