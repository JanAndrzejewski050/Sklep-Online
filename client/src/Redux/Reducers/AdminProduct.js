import {
    PRODUCT_CREATE_REQ,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQ,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_DELETE_REQ,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET
} from "../Constants/AdminProduct";


const initialState = {
    loading: false,
    success: false,
    error: null
};

export const productCreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQ:
            return { ...state, loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { ...state, loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


// update product
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQ:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
};

// delete product
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQ:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DELETE_RESET:
            return {};
        default:
            return state;
    }
};