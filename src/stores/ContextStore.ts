import { observable, action } from "mobx";

interface Breadcrumb {
  to: string;
  name: string;
  id: string;
}

export class ContextStore {
  @observable
  public isNavigationHidden = false;

  @action.bound
  public setNavigationHidden(isHidden: boolean) {
    this.isNavigationHidden = isHidden;
  }
}

export default ContextStore;
