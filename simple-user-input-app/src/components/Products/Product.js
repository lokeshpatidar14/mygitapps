import React from 'react';
import './Product.css';
import { useCart } from '../../Store/CartContext';

const Product = ({ title, price, imageUrl }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    const product = { title, price, imageUrl };
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="product">
      <img src={imageUrl} alt={title} className="product-img" />
      <div className="product-title">{title}</div>
      <div className="product-price">${price}</div>
      <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
