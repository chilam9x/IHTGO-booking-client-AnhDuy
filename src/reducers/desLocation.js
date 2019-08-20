import { SET_DES_LOCATION } from "../utils/actions";

export default function companyReducer(state = [], action) {
  switch (action.type) {
    case SET_DES_LOCATION:
      return { ...state, ...action.location };
    default:
      return state;
  }
}
