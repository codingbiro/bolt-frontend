import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { CssBaseline } from "@material-ui/core";
import Default from "./containers/Default";
import Routes from "./Routes";
import { createStores } from "./stores";
import Apollo from "./Apollo";

const stores = createStores();

const App: React.FC = () => (
  <Provider {...stores}>
    <CssBaseline />
    <BrowserRouter>
      <Apollo>
        <Default>
          <Routes />
        </Default>
      </Apollo>
    </BrowserRouter>
  </Provider>
);

export default App;
