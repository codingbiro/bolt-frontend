import React from "react";
import { Switch } from "react-router";
import { Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/auth" component={Auth} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
