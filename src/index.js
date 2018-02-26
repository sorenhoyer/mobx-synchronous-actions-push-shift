import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import RootStore from "./stores";

ReactDOM.render(
  <App store={new RootStore()} />,
  document.getElementById("root")
);
