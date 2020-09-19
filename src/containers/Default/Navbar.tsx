import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
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
  header: {
    display: "grid",
    backgroundColor: "navy",
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
            <Link to={urls.home} className={cn(classes.margin, classes.inline)}>
              <Typography>Home</Typography>
            </Link>
            <Link
              to={urls.shop.root}
              className={cn(classes.margin, classes.inline)}
            >
              <Typography>Shop</Typography>
            </Link>
            {user.isAdmin && (
              <Link
                to={urls.admin.dashboard}
                className={cn(classes.margin, classes.inline)}
              >
                <Typography>Admin</Typography>
              </Link>
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
            <Typography>
              Hello,
              {user.email}
            </Typography>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to={urls.home} className={cn(classes.margin, classes.inline)}>
              <Typography>Home</Typography>
            </Link>
            <Link
              to={urls.shop.root}
              className={cn(classes.margin, classes.inline)}
            >
              <Typography>Shop</Typography>
            </Link>
            <Link
              to={urls.auth.login}
              className={cn(classes.margin, classes.inline)}
            >
              <Typography>Login</Typography>
            </Link>
            <Link
              to={urls.auth.resetpassword}
              className={cn(classes.margin, classes.inline)}
            >
              <Typography>Reset Password</Typography>
            </Link>
            <Link to={urls.auth.register} className={classes.inline}>
              <Typography>Register</Typography>
            </Link>
          </div>
          <div>
            <Typography>Hello, Stranger</Typography>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
