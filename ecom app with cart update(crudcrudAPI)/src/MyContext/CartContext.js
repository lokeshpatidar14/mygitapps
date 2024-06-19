import React, { createContext, useReducer, useContext, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item._id === newItem._id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        newItem.quantity = 1; // Initialize quantity for new item
        return { ...state, items: [...state.items, newItem] };
      }
    case 'REMOVE_FROM_CART':
      const itemId = action.payload;
      return { ...state, items: state.items.filter(item => item._id !== itemId) };
    default:
      return state;
  }
};

const baseURL = 'https://crudcrud.com/api/5f0563d348594097a6cfd337e9f9fa77';

const fetchCartItems = async (dispatch) => {
  try {
    const response = await fetch(`${baseURL}/cart`);
    const data = await response.json();
    dispatch({ type: 'SET_CART_ITEMS', payload: data });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

const addToCartAPI = async (item, dispatch) => {
  try {
    const response = await fetch(`${baseURL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    dispatch({ type: 'ADD_TO_CART', payload: data });
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

const removeFromCartAPI = async (itemId, dispatch) => {
  try {
    await fetch(`${baseURL}/cart/${itemId}`, {
      method: 'DELETE',
    });
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

const initialCartState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    fetchCartItems(dispatch);
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch, addToCartAPI, removeFromCartAPI }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
