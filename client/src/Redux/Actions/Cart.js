import axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_ITEM_CLEAR,
    CART_SAVE_ADRESS,
    SAVE_PAYMENT_METHOD
} from "../Constants/Cart";

import { BASE_URL } from "../Constants/BASE_URL";

// Akcja dodawania elementu do koszyka
export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`);
        
        // Wysyłanie akcji z nowymi danymi do reduktora
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });

        // Zapisanie koszyka w localStorage
        const cartItems = getState().cartReducer.cartItems;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

    } catch (error) {
        console.log(error);
    }
};

// Akcja usuwania elementu z koszyka
export const removeFromCartAction = (id) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    });

    // Zapisanie zaktualizowanego koszyka w localStorage
    localStorage.setItem("cartItems", JSON.stringify(getState().cartReducer.cartItems));
};

// Akcja czyszczenia całego koszyka
export const clearCartAction = () => (dispatch) => {
    dispatch({
        type: CART_ITEM_CLEAR
    });

    // Usuwanie koszyka z localStorage
    localStorage.removeItem("cartItems");
};

// Akcja zapisywania adresu wysyłki
export const saveShippingAddressAction = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_ADRESS,
        payload: data
    });

    // Zapisanie adresu wysyłki w localStorage
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Akcja zapisywania metody płatności
export const savePaymentMethodAction = (data) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: data
    });

    // Zapisanie metody płatności w localStorage
    localStorage.setItem("paymentMethod", JSON.stringify(data));
};
