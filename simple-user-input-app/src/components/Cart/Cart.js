import React from 'react';
import './Cart.css';
import { useCart } from '../../Store/CartContext';

const Cart = (props) => {
  const { state, dispatch } = useCart();

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        state.items.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
            <div className="cart-item-details">
              <div>{item.title}</div>
              <div>${item.price} x {item.quantity}</div>
              <button className="remove-item-button" onClick={() => removeItem(index)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <button onClick={props.onClick} className='close-button'>X</button>
    </div>
  );
};

export default Cart;
