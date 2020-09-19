import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  red: {
    color: "orange",
    marginBottom: "40px",
  },
}));

const Dashboard: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.red} variant="h2">
        Dashboard
      </Typography>
    </>
  );
};

export default Dashboard;
