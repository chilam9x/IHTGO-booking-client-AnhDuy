import { SET_MENU } from "../utils/actions";
const initState = {
  key: "1"
};
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case SET_MENU:
      return { ...state, key: action.key };
    default:
      return state;
  }
}
