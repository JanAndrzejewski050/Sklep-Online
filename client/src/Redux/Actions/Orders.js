import axios from "axios";
import {
  LIST_ORDERS_FAIL,
  LIST_ORDERS_REQ,
  LIST_ORDERS_SUCCESS,
} from "../Constants/Orders";

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_ORDERS_REQ });

    // Pobierz dane użytkownika z localStorage
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      dispatch({ type: LIST_ORDERS_FAIL, payload: "User not logged in" });
      return;
    }

    const parsedUserInfo = JSON.parse(userInfo);
    if (!parsedUserInfo.token) {
      dispatch({ type: LIST_ORDERS_FAIL, payload: "No token found" });
      return;
    }

    // Wysyłamy zapytanie do API
    const config = {
      headers: {
        Authorization: `Bearer ${parsedUserInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:3000/api/orders", config);

    dispatch({ type: LIST_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LIST_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
