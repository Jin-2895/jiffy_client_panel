import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Redux
import { Provider } from "react-redux";
import { store } from "./Redux/store";
//helmet provider for react to optmize seo
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
