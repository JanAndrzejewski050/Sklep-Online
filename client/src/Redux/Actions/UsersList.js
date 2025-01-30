import { USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS } from "../Constants/UsersList";
import axios from "axios";

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const userInfo = localStorage.getItem("userInfo");

    console.log(userInfo);

    // Sprawdzenie, czy użytkownik jest zalogowany
    if (!userInfo) {
      dispatch({
        type: USER_LIST_FAIL,
        payload: "Nie jesteś zalogowany, zaloguj się, aby zobaczyć listę użytkowników",
      });
      return;
    }

    // Parsowanie userInfo z localStorage
    const parsedUserInfo = JSON.parse(userInfo);
    console.log(parsedUserInfo.token)
    // Sprawdzenie, czy userInfo zawiera token
    if (!parsedUserInfo.token) {
      dispatch({
        type: USER_LIST_FAIL,
        payload: "Brak tokenu w danych użytkownika",
      });
      return;
    }

    // Konfiguracja nagłówka z tokenem
    const config = {
      headers: {
        Authorization: `Bearer ${parsedUserInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:3000/api/users/userslist", config);
    console.log(data)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
