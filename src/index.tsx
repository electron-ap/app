import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthorityProvider from "libs/context/authorityProvider";

ReactDOM.render(
  <AuthorityProvider>
    <App />
  </AuthorityProvider>,
  document.getElementById("root")
);
