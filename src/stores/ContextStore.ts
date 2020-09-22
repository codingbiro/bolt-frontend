import { observable, action } from "mobx";
import FlashMessage from "./FlashMessage.model";

export class ContextStore {
  @observable
  public isNavigationHidden = false;

  @observable
  flashMessages = observable.array<FlashMessage>();

  @action.bound
  public setNavigationHidden(isHidden: boolean) {
    this.isNavigationHidden = isHidden;
  }

  @action.bound
  flash(message: FlashMessage): void {
    this.flashMessages.push(message);
  }

  @action.bound
  removeFlash(id: string): void {
    const message = this.flashMessages.find((e) => e.id === id);
    if (!message) return;
    this.flashMessages.remove(message);
  }
}

export default ContextStore;
