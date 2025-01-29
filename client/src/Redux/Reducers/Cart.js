import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CART_ITEM_CLEAR,
  CART_SAVE_ADRESS,
  SAVE_PAYMENT_METHOD
} from "../Constants/Cart"


export const cartReducer = (
  state = {cartItems:[], shippingAddress:{}}, action
) => {

  switch (action.type) {
      case ADD_TO_CART:
          const item = action.payload;
          const existItem = state.cartItems.find((x) => x.product === item.product);
          if (existItem) {
              return {
                  ...state,
                  cartItems: state.cartItems.map((x) => {
                      return x.product === existItem.product ? item : x;
                  })
              }
          } else {
              return {
                  ...state,
                  cartItems:[...state.cartItems, item]
              }
          }
      case REMOVE_FROM_CART:
          return {
              ...state,
              cartItems: state.cartItems.filter((x)=>x.product !== action.payload)
          }
      case CART_SAVE_ADRESS:
          return { ...state, shippingAddress: action.payload }
      case SAVE_PAYMENT_METHOD:
          return { ...state, paymentMethod: action.payload }
      case CART_ITEM_CLEAR:
          return { ...state, cartItems: [] }
      default:
          return state;
  }
  
}