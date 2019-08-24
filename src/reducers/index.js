import { combineReducers } from "redux";
import sourceLocation from "./sourceLocation";
import desLocation from "./desLocation";
import orderInfo from "./orderInfo";
import orderList from "./orderList";
import sideBar from "./sideBar";

const reducer = combineReducers({
  sourceLocation: sourceLocation,
  desLocation: desLocation,
  orderInfo: orderInfo,
  orderList: orderList,
  sideBar: sideBar
});

export default reducer;
