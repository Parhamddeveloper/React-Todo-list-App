import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.js";
import { MotionConfig } from "framer-motion";
import "../node_modules/react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MotionConfig>
      <App />
    </MotionConfig>
  </Provider>,
);
