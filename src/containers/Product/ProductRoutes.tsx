import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router";
import ProductCreate from "./ProductCreate";
import Products from "./Products";

const ProductRoutes: React.FC<RouteComponentProps> = ({ match }) => (
  <Switch>
    <Route path={`${match.path}/add`} component={ProductCreate} />
    <Route path={`${match.path}`} component={Products} />
  </Switch>
);

export default ProductRoutes;
