import React from 'react';
import './Product.css';

const Product = ({ title, price, imageUrl, addToCart }) => (
  <div className="product">
    <img src={imageUrl} alt={title} className="product-img" />
    <div className="product-title">{title}</div>
    <div className="product-price">${price}</div>
    <button onClick={addToCart} className="add-to-cart-button">Add to Cart</button>
  </div>
);

export default Product;
