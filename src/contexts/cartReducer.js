import { CART_ACTIONS } from './cartConstants';

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART: {
      return {
        ...state,
        cartItems: action.payload,
        isLoading: false
      };
    }
      
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let newCartItems;
      
      if (existingItem) {
        newCartItems = state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCartItems = [...state.cartItems, { 
          ...action.payload, 
          quantity: 1,
          image: action.payload.image || action.payload.img,
          name: action.payload.name || action.payload.title
        }];
      }
      
      return {
        ...state,
        cartItems: newCartItems
      };
    }
      
    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.payload.quantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    }
      
    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    }
      
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        cartItems: []
      };
    }
      
    default: {
      return state;
    }
  }
};