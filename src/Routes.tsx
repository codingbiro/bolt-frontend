import React from "react";
import { Switch } from "react-router";
import { Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth";
import Welcome from "./components/Welcome";
import ProductRoutes from "./containers/Product/ProductRoutes";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Route path="/products" component={ProductRoutes} />
    <Route path="/" component={Welcome} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
