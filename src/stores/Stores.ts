import React from "react";
import { MobXProviderContext } from "mobx-react";
import { ContextStore } from "./ContextStore";
import AuthStore from "./AuthStore";

export default function createStores() {
  return {
    contextStore: new ContextStore(),
    authStore: new AuthStore(),
  };
}

export type Stores = ReturnType<typeof createStores>;

export function useStores(): Stores {
  return React.useContext(MobXProviderContext) as Stores;
}
