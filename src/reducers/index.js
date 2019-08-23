import { combineReducers } from "redux";
import sourceLocation from "./sourceLocation";
import desLocation from "./desLocation";
import orderInfo from "./orderInfo";
import orderList from "./orderList";

const reducer = combineReducers({
  sourceLocation: sourceLocation,
  desLocation: desLocation,
  orderInfo: orderInfo,
  orderList: orderList
});

export default reducer;
