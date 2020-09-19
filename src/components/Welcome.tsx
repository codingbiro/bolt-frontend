import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  lead: {
    paddingTop: "40px",
  },
}));

const Welcome: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.lead} variant="h2">
        Szevasztok
      </Typography>
    </>
  );
};

export default Welcome;
