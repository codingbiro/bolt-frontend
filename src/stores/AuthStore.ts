import { ApolloClient } from "@apollo/client";
import { observable, action, decorate } from "mobx";
import { logout } from "../containers/Auth/api";

export interface User {
  email: string;
}

export default class AuthStore {
  // These are observables
  // @observer does not work with an initial value of undefined
  // The decorate function works fine and is used at the bottom of this file
  isLoggedIn = false;
  user?: User = undefined;

  @action.bound
  public login(user: User): void {
    this.isLoggedIn = true;
    this.user = observable(user);
  }

  @action.bound
  // eslint-disable-next-line @typescript-eslint/ban-types
  public async logout(apolloClient: ApolloClient<object>): Promise<void> {
    await Promise.all([logout(), apolloClient.clearStore()]);
    this.user = undefined;
    this.isLoggedIn = false;
  }
}

decorate(AuthStore, {
  isLoggedIn: observable,
  user: observable,
});
