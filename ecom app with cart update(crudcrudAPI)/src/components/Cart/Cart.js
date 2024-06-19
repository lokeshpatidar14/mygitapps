import React from 'react';
import './Cart.css';
import { useCart } from '../../MyContext/CartContext';

const Cart = (props) => {
  const { state, dispatch, removeFromCartAPI } = useCart();

  const removeItem = (itemId) => {
    const itemToRemove = state.items.find(item => item._id === itemId);
    if (itemToRemove.quantity > 1) {
      removeFromCartAPI(itemId, dispatch);
    } else {
      removeFromCartAPI(itemId, dispatch);
    }
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        state.items.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.imageUrl} alt={item.title} className="cart-item-img" />
            <div className="cart-item-details">
              <div>{item.title}</div>
              <div>${item.price} x {item.quantity}</div>
              <button className="remove-item-button" onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
      <button onClick={props.onClick} className='close-button'>X</button>
    </div>
  );
};

export default Cart;
