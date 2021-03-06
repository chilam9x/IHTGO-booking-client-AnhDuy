import {
  SET_ORDER_LIST,
  SET_ORDER_LIST_ALL,
  SET_ORDER_LIST_WAITING,
  SET_ORDER_LIST_FINISHED,
  SET_ORDER_LIST_CANCELLED,
  RESET_ORDER_LIST_ALL,
  RESET_ORDER_LIST_SEARCH,
  RESET_ORDER_LIST_WAITING,
  RESET_ORDER_LIST_FINISHED,
  RESET_ORDER_LIST_CANCELLED,
  SET_ORDER_LIST_SEARCH
} from "../utils/actions";
import { ALL } from "../utils/constants";
const initState = {
  current_option: ALL,
  all: [],
  search: [],
  waiting: [],
  cancelled: [],
  finished: []
};
export default function companyReducer(state = initState, action) {
  switch (action.type) {
    case SET_ORDER_LIST:
      return { ...state, ...action.orders };
    case SET_ORDER_LIST_ALL:
      return {
        ...state,
        all: state.all ? [...state.all, ...action.orders] : action.orders
      };
    case SET_ORDER_LIST_SEARCH:
      return {
        ...state,
        search: state.search
          ? [...state.search, ...action.orders]
          : action.orders
      };
    case SET_ORDER_LIST_WAITING:
      return {
        ...state,
        waiting: state.waiting
          ? [...state.waiting, ...action.orders]
          : action.orders
      };
    case SET_ORDER_LIST_FINISHED:
      return {
        ...state,
        finished: state.finished
          ? [...state.finished, ...action.orders]
          : action.orders
      };
    case SET_ORDER_LIST_CANCELLED:
      return {
        ...state,
        cancelled: state.cancelled
          ? [...state.cancelled, ...action.orders]
          : action.orders
      };
    case RESET_ORDER_LIST_ALL:
      return {
        ...state,
        all: []
      };
    case RESET_ORDER_LIST_SEARCH:
      return {
        ...state,
        search: []
      };
    case RESET_ORDER_LIST_WAITING:
      return {
        ...state,
        waiting: []
      };
    case RESET_ORDER_LIST_FINISHED:
      return {
        ...state,
        finished: []
      };
    case RESET_ORDER_LIST_CANCELLED:
      return {
        ...state,
        cancelled: []
      };
    default:
      return state;
  }
}
