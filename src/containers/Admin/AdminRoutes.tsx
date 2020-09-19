import React from "react";
import { Route, Switch, Redirect } from "react-router";
import ProductCreate from "./ProductCreate";
import Dashboard from "./Dashboard";
import urls from "../../const/urls";

const AdminRoutes: React.FC = () => (
  <Switch>
    <Route path={urls.admin.dashboard} component={Dashboard} />
    <Route path={urls.admin.addproduct} component={ProductCreate} />
    <Redirect to={urls.home} />
  </Switch>
);

export default AdminRoutes;
