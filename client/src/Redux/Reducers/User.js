import {
    USER_LOGIN_REQ, USER_LOGIN_REQ_SUCCESS, USER_LOGOUT, USER_LOGIN_REQ_FAIL,
    USER_REGISTER_REQ, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL
} from "../Constants/User";

// Pobieramy userInfo z localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const userLoginReducer = (state = { userInfo: userInfoFromStorage }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQ:
            return { loading: true };
        case USER_LOGIN_REQ_SUCCESS:
            localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Zapisujemy w localStorage
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_REQ_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            localStorage.removeItem("userInfo"); // Usuwamy z localStorage przy wylogowaniu
            return {};
        default:
            return state; // Zwracamy aktualny stan zamiast `false`
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQ:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
