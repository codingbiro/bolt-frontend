import React from "react";
import { inject, observer } from "mobx-react";
import { Stores } from "./Stores";

// Hack to fix @inject making injected stores optional from the outside
// Stores are optional argements when a component is wrapped in this HOC
// Stores can be defined as required argements in the props
// This solution is based on: https://github.com/mobxjs/mobx-react/issues/256
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export default function withStores<TStoreProps extends keyof Stores>(
  ...stores: TStoreProps[]
) {
  return <TProps extends Pick<Stores, TStoreProps>>(
    component: React.ComponentType<TProps>
  ) =>
    (inject(...stores)(observer(component)) as unknown) as React.FC<
      Omit<TProps, TStoreProps> & Partial<Pick<Stores, TStoreProps>>
    >;
}
