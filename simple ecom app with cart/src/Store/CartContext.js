import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, items: updatedItems };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
      case 'REMOVE_FROM_CART':
        const itemIndex = action.payload;
        const itemToUpdate = state.items[itemIndex];
        if (itemToUpdate.quantity > 1) {
          const updatedItems = [...state.items];
          updatedItems[itemIndex] = {
            ...itemToUpdate,
            quantity: itemToUpdate.quantity - 1,
          };
          return { ...state, items: updatedItems };
        } else {
          return {
            ...state,
            items: state.items.filter((_, index) => index !== itemIndex),
          };
        }
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
