import { createContext, useContext, useReducer, useEffect } from "react";
import { CartReducer, totalItems } from "../reducers";
import { initCheckout } from "../utils/stripe";

export const CartContext = createContext();

const initialState = {
  cart: [],
  ...totalItems([])
}

export const Provider = ({children}) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addGame = payload => {
    dispatch({
      type: "ADD_GAME",
      payload
    })
  }

  const removeGame = payload => {
    dispatch({
      type: "REMOVE_GAME",
      payload
    })
  }

  const clearCart = () => {
    dispatch({
      type: "CLEAR_CART"
    })
  }

  const updateQuantity = payload => {
    dispatch({
      type: "UPDATE_CART",
      payload
    })
  }

  const checkout = () => {
    initCheckout({
      lineItems: state.cart.map(({productId, quantity}) => ({ price: productId, quantity}))
    }).then(() => {
      dispatch({
        type: "CLEAR_CART"
      })
    })
  }

  const value = {
    addGame,
    removeGame,
    clearCart,
    updateQuantity,
    checkout,
    ...state
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartState = () => {
  useEffect(() => {
    
  })
  return useContext(CartContext)
};