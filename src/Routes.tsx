import React from "react";
import { Switch, Route, Redirect } from "react-router";
import AuthRoutes from "./containers/Auth";
import Landing from "./components/Landing";
import ShopRoutes from "./containers/Shop";
import AdminRoutes from "./containers/Admin";
import urls from "./const/urls";

const Routes: React.FC = () => (
  <Switch>
    <Route path={urls.auth.root} component={AuthRoutes} />
    <Route path={urls.shop.root} component={ShopRoutes} />
    <Route path={urls.admin.dashboard} component={AdminRoutes} />
    <Route exact path={urls.home} component={Landing} />
    <Redirect to={urls.home} />
  </Switch>
);

export default Routes;
