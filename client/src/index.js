import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { AppProvider } from "./components/context";

ReactDOM.render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>,
  document.getElementById("root")
);
