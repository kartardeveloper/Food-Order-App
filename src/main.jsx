import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProgressContextProvider>
      <CartContextProvider>
        <div id="modal"></div>
        {/* <div id="toast"></div> */}
        <App />
      </CartContextProvider>
    </UserProgressContextProvider>
  </React.StrictMode>
);
