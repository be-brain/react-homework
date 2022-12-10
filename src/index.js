import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")); // id값이 root인 코드로 랜더링해라
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
