import React, { useReducer, useEffect } from 'react';
import { CartContext } from './cartContext';
import { cartReducer } from './cartReducer';
import { initialState } from './cartConstants';

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('fakeStoreCart');
    if (savedCart) {
      try {
        dispatch({
          type: 'SET_CART',
          payload: JSON.parse(savedCart)
        });
      } catch (error) {
        console.error('Error parsing cart data:', error);
        dispatch({
          type: 'SET_CART',
          payload: []
        });
      }
    } else {
      dispatch({
        type: 'SET_CART',
        payload: []
      });
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('fakeStoreCart', JSON.stringify(state.cartItems));
    }
  }, [state.cartItems, state.isLoading]);

  // Acciones del carrito
  const addItem = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: product
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    cartItems: state.cartItems,
    isLoading: state.isLoading,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};