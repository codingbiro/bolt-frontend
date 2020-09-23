import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router";
import { useApolloClient } from "@apollo/client";
import { whoami } from "../Auth/api";
import { useStores } from "../../stores";
import Navbar from "./Navbar";
import { USER } from "../../graphql/graphql";
import { User, UserVariables } from "../../graphql/types";
import FlashMessages from "./FlashMessages";
import FlashMessage from "../../stores/FlashMessage.model";
import rectLight from "../../assets/rectLight.svg";

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
    height: "4px",
    backgroundColor: "rgba( 0, 0, 0, 0.8)",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  pointer: {
    cursor: "pointer",
  },
  rectLight: {
    position: "absolute",
    bottom: "0",
    height: "250px",
    left: 0,
    right: 0,
    overflow: "hidden",
  },
}));

const Default: React.FC = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore, contextStore } = useStores();
  const isNavigationHidden = useObserver(() => contextStore.isNavigationHidden);
  const user = useObserver(() => authStore.user);
  const [loading, setLoading] = useState(true);
  const [stillLoading, setStillLoading] = useState(true);
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

  if (loading)
    return (
      <div className={classes.top}>
        <LinearProgress />
      </div>
    );

  setTimeout(() => setStillLoading(false), 1500);

  return (
    <div className="App">
      <FlashMessages />
      {stillLoading ? (
        <LinearProgress style={{ backgroundColor: "black" }} />
      ) : (
        <div className={classes.line} />
      )}
      {!isNavigationHidden && (
        <Navbar
          user={user}
          Logout={() => {
            authStore.logout(client);
            contextStore.flash(
              new FlashMessage("logout successful", "neutral", 5000)
            );
            history.push("/");
          }}
        />
      )}
      <div>{children}</div>
      <div className={classes.rectLight}>
        <img src={rectLight} alt="Rect Light" />
      </div>
    </div>
  );
};

export default Default;
