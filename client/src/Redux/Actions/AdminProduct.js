import axios from "axios";
import {
    PRODUCT_CREATE_REQ,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,

    PRODUCT_UPDATE_REQ,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,

    PRODUCT_DELETE_REQ,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} from "../Constants/AdminProduct";

// Tworzenie nowego produktu (admin only)
export const createProductAction = (productData) => async (dispatch, getState) => {
    console.log("chuj");
    try {
        console.log(state.productCreateReducer);
        dispatch({ type: PRODUCT_CREATE_REQ });

        const user = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(user);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.post(`${BASE_URL}/api/products`, productData, config);
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// Edycja produktu (admin only)
export const updateProductAction = (id, updatedData) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQ });

        const user = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(user);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${BASE_URL}/api/products/${id}`, updatedData, config);
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

// Usunięcie produktu (admin only)
export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_DELETE_REQ });

        const user = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(user);
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        await axios.delete(`${BASE_URL}/api/products/${id}`, config);
        dispatch({ type: PRODUCT_DELETE_SUCCESS });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};