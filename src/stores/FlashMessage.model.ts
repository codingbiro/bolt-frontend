import { v4 as uuidv4 } from "uuid";
import { observable, action } from "mobx";

type Variant = "success" | "error" | "neutral";

class FlashMessage {
  public readonly content: string;

  public readonly id: string;

  public readonly duration?: number;

  public readonly variant: Variant;

  @observable public open = true;

  constructor(content: string, variant: Variant, duration?: number) {
    this.content = content;
    this.duration = duration;
    this.variant = variant;
    this.id = uuidv4();
  }

  @action.bound
  public close = () => {
    this.open = false;
  };
}

export default FlashMessage;
