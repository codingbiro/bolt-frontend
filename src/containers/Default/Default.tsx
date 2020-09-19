import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { whoami } from "../Auth/api";
import { AuthStore, useStores, withStores } from "../../stores";
import Navbar from "./Navbar";
import { USER } from "../../graphql/graphql";
import { User, UserVariables } from "../../graphql/types";

const useStyles = makeStyles(() => ({
  margin: {
    marginRight: "24px",
  },
  inline: {
    display: "inline-block",
  },
  header: {
    display: "grid",
    backgroundColor: "navy",
    color: "white",
    gridTemplateColumns: "1fr 1fr",
    padding: "12px 24px",
  },
  line: {
    height: "6px",
    backgroundColor: "rgba( 0, 0, 255, 0.85)",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  pointer: {
    cursor: "pointer",
  },
}));

const Default: React.FC<{ authStore: AuthStore }> = ({
  authStore,
  children,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { contextStore } = useStores();
  const isNavigationHidden = useObserver(() => contextStore.isNavigationHidden);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();
  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const { id, email } = await whoami();
        const { data } = await client.query<User, UserVariables>({
          query: USER,
          variables: { id },
        });
        if (data) {
          authStore.login({
            id,
            email,
            name: data.user.name,
            isAdmin: data.user.isAdmin,
          });
        }
      } catch (e) {
        // User do not have an authenticated session
      } finally {
        setLoading(false);
      }
    }
    checkLoginStatus().then();
  }, [authStore, client]);

  const user = authStore?.user;

  if (loading)
    return (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );

  return (
    <div className="App">
      <div className={classes.line} />
      {!isNavigationHidden && (
        <Navbar
          user={user}
          Logout={() => {
            authStore.logout(client);
            history.push("/");
          }}
        />
      )}
      <div>{children}</div>
    </div>
  );
};

export default withStores("authStore")(Default);
