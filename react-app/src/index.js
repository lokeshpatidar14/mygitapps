import React from "react";
import ReactDOM from "react-dom";
import AppWithProvider from "./App";
import { AuthContextProvider } from "./MyContext/auth-context";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <AppWithProvider />
  </AuthContextProvider>
);
