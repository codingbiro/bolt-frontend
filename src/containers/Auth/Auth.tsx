import React from "react";
import { makeStyles } from "@material-ui/core";
// import useHideNavigation from "../../components/useHideNavigation";

const useStyles = makeStyles(() => ({
  red: {
    color: "red",
  },
}));

const Default: React.FC = () => {
  const classes = useStyles();
  // useHideNavigation();
  return <div className={classes.red}>Hey Auth</div>;
};

export default Default;
