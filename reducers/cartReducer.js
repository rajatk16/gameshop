export const totalItems = cart => (
  {
    itemCount: cart.reduce((acc, item) => acc + item.quantity, 0),
    total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)
  }
)

export const CartReducer = (state, action) => {
  switch(action.type) {
    case "ADD_GAME": 
      if (!state.cart.find(item => item.id === action.payload.id)) {
        state.cart.push({
          ...action.payload,
          quantity: 1
        })
      }
      return {
        ...state,
        ...totalItems(state.cart),
        cart: [
          ...state.cart
        ]
      }
    case 'REMOVE_COMIC':
      return {
        ...state,
        ...sumItems(state.cart.filter(item => item.id !== action.payload.id)),
        cart: [
          ...state.cart.filter(item => item.id !== action.payload.id)
        ]
      }

    case 'UPDATE_QUANTITY': 
      const {item, newQuantity} = action.payload
      console.log(item)
      console.log(newQuantity)
      break;
    case "CLEAR_CART":
      return {
        cart: [],
        ...totalItems([])
      }
  }
}

