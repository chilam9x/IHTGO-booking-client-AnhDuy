import { combineReducers } from "redux";
import sourceLocation from "./sourceLocation";

const reducer = combineReducers({
  sourceLocation: sourceLocation
});

export default reducer;
