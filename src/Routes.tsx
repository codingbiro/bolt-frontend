import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Auth from "./containers/Auth";
import Welcome from "./components/Welcome";
import ProductRoutes from "./containers/Shop/ProductRoutes";
import AdminRoutes from "./containers/Admin/AdminRoutes";
import urls from "./const/urls";

const Routes: React.FC = () => (
  <Switch>
    <Route path={urls.auth.root} component={Auth} />
    <Route path={urls.shop.root} component={ProductRoutes} />
    <Route path={urls.admin.dashboard} component={AdminRoutes} />
    <Route path={urls.home} component={Welcome} />
    <Redirect to={urls.home} />
  </Switch>
);

export default Routes;
