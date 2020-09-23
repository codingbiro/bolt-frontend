import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { User } from "../../stores/AuthStore";
import urls from "../../const/urls";

const useStyles = makeStyles(() => ({
  margin: {
    marginRight: "24px",
  },
  inline: {
    display: "inline-block",
  },
  navLink: {
    display: "inline-block",
    "&.active": {
      color: "rgba( 0, 0, 0, 1)!important",
    },
  },
  header: {
    display: "grid",
    backgroundColor: "rgba(185, 168, 15, 1)",
    color: "white",
    gridTemplateColumns: "1fr 1fr",
    padding: "12px 24px",
  },
  pointer: {
    cursor: "pointer",
  },
}));

interface Props {
  Logout: () => void;
  user?: User;
}

const Navbar: React.FC<Props> = ({ user, Logout }) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      {user ? (
        <>
          <div>
            <NavLink
              exact
              to={urls.home}
              className={cn(classes.margin, classes.navLink)}
            >
              <Typography>Home</Typography>
            </NavLink>
            <NavLink
              to={urls.shop.root}
              className={cn(classes.margin, classes.navLink)}
            >
              <Typography>Shop</Typography>
            </NavLink>
            {user.isAdmin && (
              <NavLink
                to={urls.admin.dashboard}
                className={cn(classes.margin, classes.navLink)}
              >
                <Typography>Admin</Typography>
              </NavLink>
            )}
            <div
              onClick={Logout}
              className={cn(classes.pointer, classes.inline)}
              role="button"
              tabIndex={0}
              onKeyPress={Logout}
            >
              <Typography>Logout</Typography>
            </div>
          </div>
          <div>
            <Typography>Hello, {user.email}</Typography>
          </div>
        </>
      ) : (
        <>
          <div>
            <NavLink
              exact
              to={urls.home}
              className={cn(classes.margin, classes.navLink)}
            >
              <Typography>Home</Typography>
            </NavLink>
            <NavLink
              to={urls.auth.login}
              className={cn(classes.margin, classes.navLink)}
            >
              <Typography>Login</Typography>
            </NavLink>
            <NavLink to={urls.auth.register} className={classes.navLink}>
              <Typography style={{ color: "red" }}>Join Now</Typography>
            </NavLink>
          </div>
          <div>
            <Typography>Bolt Framework &copy;</Typography>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
