import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  padding: {
    padding: "12px",
  },
  container: {
    width: "50%",
    maxWidth: "500px",
    margin: "auto",
    textAlign: "center",
    border: "dashed 1px yellow",
    marginBottom: "18px",
  },
}));

interface Props {
  name: string;
  price: number;
  desc?: string;
}

const Welcome: React.FC<Props> = ({ name, price, desc }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography className={classes.padding} variant="h4">
        {name}
      </Typography>
      <Typography className={classes.padding} variant="h6">
        {price} HUF
      </Typography>
      {desc && (
        <Typography className={classes.padding} variant="body1">
          {desc}
        </Typography>
      )}
    </div>
  );
};

export default Welcome;
