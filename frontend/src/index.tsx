import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import configureLanguages from "./config/i18n.config";
import App from "./containers/App";

import "semantic-ui-css/semantic.min.css";
import "./styles/common.scss";

configureLanguages();

const root = document.getElementById("root");
ReactDOM.render(<App />, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
