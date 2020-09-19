import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import ResetPassword from "./ResetPassword";
import ChangePassword from "./ChangePassword";
import Login from "./Login";
import Register from "./Register";

const Auth: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/login`} component={Login} />
      <Route path={`${match.path}/register`} component={Register} />
      <Route path={`${match.path}/resetpassword`} component={ResetPassword} />
      <Route path={`${match.path}/changepassword`} component={ChangePassword} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Auth;
