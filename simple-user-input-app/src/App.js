import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import "./App.css";
import { useCart, CartProvider } from "./Store/CartContext";
import AboutUs from "./components/Pages/About";
import Home from "./components/Pages/Home";
import ContactUs from "./components/Pages/ContactUs";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <button onClick={toggleCart} className="cart-button">
                Cart (
                {state.items.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>

        {isCartOpen && <Cart onClick={toggleCart} />}
       
      </div>
    </Router>
  );
}

const AppWithProvider = () => (
  <CartProvider>
    <App />
  </CartProvider>
);

export default AppWithProvider;
