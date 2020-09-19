import React from "react";
import { Redirect, Route, Switch } from "react-router";
import ResetPassword from "./ResetPassword";
import ChangePassword from "./ChangePassword";
import Login from "./Login";
import Register from "./Register";
import urls from "../../const/urls";

const AuthRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path={urls.auth.login} component={Login} />
      <Route path={urls.auth.register} component={Register} />
      <Route path={urls.auth.resetpassword} component={ResetPassword} />
      <Route path={urls.auth.changepassword} component={ChangePassword} />
      <Redirect to={urls.home} />
    </Switch>
  );
};

export default AuthRoutes;
