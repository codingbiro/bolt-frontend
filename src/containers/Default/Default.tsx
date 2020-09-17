import { useObserver } from "mobx-react";
import React, { useEffect, useState } from "react";
import { AuthStore, useStores, withStores } from "../../stores";
import { Typography, CircularProgress, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { default as cn } from "classnames";
import { whoami } from "../Auth/api";
import { useApolloClient } from "@apollo/client";

const useStyles = makeStyles(() => ({
  padding: {
    paddingRight: "24px",
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
  const client = useApolloClient();
  const history = useHistory();
  const { contextStore } = useStores();
  const isNavigationHidden = useObserver(() => contextStore.isNavigationHidden);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const { email } = await whoami();
        authStore.login({
          email,
        });
      } catch (e) {
        // User do not have an authenticated session
      } finally {
        setLoading(false);
      }
    }
    checkLoginStatus().then();
  }, [authStore]);

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
      {!isNavigationHidden &&
        (user ? (
          <header className={classes.header}>
            <div>
              <Link to="/" className={cn(classes.padding, classes.inline)}>
                <Typography>Home</Typography>
              </Link>
              <div
                onClick={() => {
                  authStore.logout(client);
                  history.push("/");
                }}
                className={cn(classes.pointer, classes.inline)}
              >
                <Typography>Logout</Typography>
              </div>
            </div>
            <div>
              <Typography>Hello, {user.email}</Typography>
            </div>
          </header>
        ) : (
          <header className={classes.header}>
            <div>
              <Link to="/" className={cn(classes.padding, classes.inline)}>
                <Typography>Home</Typography>
              </Link>
              <Link to="/auth" className={classes.inline}>
                <Typography>Login</Typography>
              </Link>
            </div>
            <div>
              <Typography>Hello, Stranger</Typography>
            </div>
          </header>
        ))}
      <div>{children}</div>
    </div>
  );
};

export default withStores("authStore")(Default);
