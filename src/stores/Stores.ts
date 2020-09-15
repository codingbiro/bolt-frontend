import React from "react";
import { MobXProviderContext } from "mobx-react";
import { ContextStore } from "./ContextStore";

export default function createStores() {
  return {
    contextStore: new ContextStore(),
  };
}

export type Stores = ReturnType<typeof createStores>;

export function useStores(): Stores {
  return React.useContext(MobXProviderContext) as Stores;
}
