import { SET_DES_LOCATION } from "../utils/actions";
const initState = {
  lat: null,
  lng: null,
  place: null
};
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case SET_DES_LOCATION:
      return { ...state, ...action.location };
    default:
      return state;
  }
}
