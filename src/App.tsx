import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Default from "./containers/Default";
import Routes from "./Routes";
import { Provider } from "mobx-react";
import { createStores } from "./stores";
import { CssBaseline } from "@material-ui/core";

const stores = createStores();

const App: React.FC = () => (
  <Provider {...stores}>
    <CssBaseline />
    <BrowserRouter>
      <Default>
        <Routes />
      </Default>
    </BrowserRouter>
  </Provider>
);

export default App;
