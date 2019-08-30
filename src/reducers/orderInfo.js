import { SET_ORDER_INFO } from "../utils/actions";
const initState = {
  name: null,
  distance: null,
  height: null,
  width: null,
  weight: null,
  len: null,
  isSpeed: false,
  isHandOn: false,
  isDischarge: true,
  isInventory: false,
  isDocument: false,
  totalPrice: null,
  sender_name: null,
  sender_phone: null,
  receiver_name: null,
  receiver_phone: null,
  note: null,
  coupon_code: null,
  cod: null,
  created_id: null,
  created_price: null
};
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORDER_INFO:
      return { ...state, ...action.order };
    default:
      return state;
  }
}
