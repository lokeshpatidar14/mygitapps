import React, { useState } from 'react';
import './App.css';
import { useCart } from './Store/CartContext';
import Product from './components/Products/Product';
import Cart from './components/Cart/Cart';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  }
];

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state, dispatch } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="App">
      <header>
        <button onClick={toggleCart} className="cart-button">
          Cart ({state.items.reduce((total, item) => total + item.quantity, 0)})
        </button>
      </header>
      <div className="products-container">
        {productsArr.map((product, index) => (
          <Product 
            key={index}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            addToCart={() => addToCart(product)}
          />
        ))}
      </div>
      {isCartOpen && <Cart />}
    </div>
  );
}

export default App;
