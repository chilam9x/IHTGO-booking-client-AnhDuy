import { SET_SOURCE_LOCATION } from "../utils/actions";
const initState = {
  lat: null,
  lng: null,
  place: null
};
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case SET_SOURCE_LOCATION:
      return { ...state, ...action.location };
    default:
      return state;
  }
}
