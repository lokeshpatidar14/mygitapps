import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useCart, CartProvider } from "./MyContext/CartContext";
import AboutUs from "./components/pages/About";
import Home from "./components/pages/Home";
import ContactUs from "./components/pages/ContactUs";
import ProductList from "./components/Products/ProductList";
import Cart from "./components/Cart/Cart";
import MainNavigation from "./components/pages/MainNavigation";
import AuthContext from "./MyContext/auth-context";
import AuthPage from "./components/pages/AuthPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();
  const authCtx = useContext(AuthContext);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <Router>
      <MainNavigation />
      <div className="App">
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              {authCtx.isLoggedIn ? (
                <NavLink to="/products">Products</NavLink>
              ) : (
                <NavLink to="/auth">Products</NavLink>
              )}
            </li>
            <li>
              <button onClick={toggleCart} className="cart-button">
                Cart ({state.items.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          {!authCtx.isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          {authCtx.isLoggedIn ? (
            <Route path="/products" element={<ProductList />} />
          ) : (
            <Route path="/products" element={<Navigate to="/auth" />} />
          )}
          <Route path="*" element={<Navigate to="/" />} />
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
