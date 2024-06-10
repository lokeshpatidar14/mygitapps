import React from 'react';
import './Cart.css';
import { useCart } from '../../Store/CartContext';

const Cart = () => {
  const { state, dispatch } = useCart();

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {state.items.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
          <div className="cart-item-details">
            <div className="cart-item-title">{item.title}</div>
            <div className="cart-item-price">${item.price}</div>
            <div className="cart-item-quantity">Quantity: {item.quantity}</div>
          </div>
          <button onClick={() => removeItem(index)} className="remove-button">Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
