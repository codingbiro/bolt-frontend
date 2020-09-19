import React from "react";
import { Route, Switch, Redirect } from "react-router";
import Products from "./Products";
import urls from "../../const/urls";

const ShopRoutes: React.FC = () => (
  <Switch>
    <Route path={urls.shop.root} component={Products} />
    <Route path={urls.shop.products} component={Products} />
    <Route path={urls.shop.product} component={Products} />
    <Redirect to={urls.home} />
  </Switch>
);

export default ShopRoutes;
