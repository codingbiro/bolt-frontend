import { observable, action } from "mobx";

export class ContextStore {
  @observable
  public isNavigationHidden = false;

  @action.bound
  public setNavigationHidden(isHidden: boolean) {
    this.isNavigationHidden = isHidden;
  }
}

export default ContextStore;
