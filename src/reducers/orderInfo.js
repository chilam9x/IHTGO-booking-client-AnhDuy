import { SET_ORDER_INFO } from "../utils/actions";

export default function companyReducer(state = [], action) {
  switch (action.type) {
    case SET_ORDER_INFO:
      return { ...state, ...action.order };
    default:
      return state;
  }
}
