import React from "react";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Store from "./store/index";

import App from "./App";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  rootElement
);
