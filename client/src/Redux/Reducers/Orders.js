import {
    LIST_ORDERS_FAIL,
    LIST_ORDERS_REQ,
    LIST_ORDERS_SUCCESS,
  } from "../Constants/Orders";
  
  const initialState = {
    orders: [],
    loading: false,
    error: null,
  };
  
  export const listOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
      case LIST_ORDERS_REQ:
        return { ...state, loading: true };
      case LIST_ORDERS_SUCCESS:
        return { loading: false, orders: action.payload, error: null };
      case LIST_ORDERS_FAIL:
        return { loading: false, error: action.payload, orders: [] };
      default:
        return state;
    }
  };
  