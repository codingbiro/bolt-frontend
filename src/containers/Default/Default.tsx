import { useObserver } from "mobx-react";
import React from "react";
import { useStores } from "../../stores";

const Default: React.FC = ({ children }) => {
  const { contextStore } = useStores();
  const isNavigationHidden = useObserver(() => contextStore.isNavigationHidden);

  return (
    <div className="App">
      {!isNavigationHidden && (
        <header className="App-header">
          <a href="/">Home</a>
          <a href="/auth">Login</a>
        </header>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Default;
