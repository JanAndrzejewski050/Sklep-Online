import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
  } from '../Constants/UsersList';
  
  const initialState = {
    loading: false,
    users: [], // Zmieniono na pustą tablicę
    error: null,
  };
  
  export const userListReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { ...state, loading: true };
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload, error: null };
      case USER_LIST_FAIL:
        return { loading: false, users: [], error: action.payload };
      default:
        return state;
    }
  };
  
  