import { useEffect } from "react";
import { useStores } from "../stores";

const useHideNavigation = () => {
  const { contextStore } = useStores();
  useEffect(() => {
    contextStore.setNavigationHidden(true);
    return () => contextStore.setNavigationHidden(false);
  });
};

export default useHideNavigation;
