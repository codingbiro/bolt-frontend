import { Box, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { FitnessCenter as FitnessCenterIcon } from "@material-ui/icons";
import AppleTabs from "./AppleTabs";

const useStyles = makeStyles(() => ({
  lead: {
    padding: "30px 0px",
  },
  icon: {
    fontSize: "50px",
  },
  lh: {
    margin: "70px 0px",
  },
  tabs: {
    backgroundColor: "#f5f5f5",
    maxWidth: "800px",
    margin: "auto",
    borderRadius: "20px",
    padding: "24px",
  },
  title: {
    margin: "20px 0px",
  },
  items: {},
  grid: {
    display: "grid",
    maxWidth: "800px",
    margin: "auto",
    gridTemplateColumns: "1fr",
  },
}));

const onlinePresence: JSX.Element = (
  <>
    In 2020 it is a must to have an online presence.
    <br />
    We provide a modern and intuitive way of introducing your brand.
  </>
);

const subscriptions: JSX.Element = (
  <>
    Let your customers purchase memberships online.
    <br />
    Members can see their subscription and can extend it.
  </>
);

const reservations: JSX.Element = (
  <>
    Users can reserve for group tranings and book personal trainers.
    <br />
    Easy to maintain and to plan available dates.
  </>
);

const TEXTS: JSX.Element[] = [onlinePresence, subscriptions, reservations];

const Landing: React.FC = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState<JSX.Element>(TEXTS[0]);
  const onTabsChange = (i: number) =>
    i - 1 > TEXTS.length ? setSelected(TEXTS[0]) : setSelected(TEXTS[i]);

  return (
    <>
      <div className={classes.lh}>
        <FitnessCenterIcon className={classes.icon} />
        <Typography className={classes.lead} variant="h2">
          Fitness Management System
        </Typography>
      </div>
      <div className={classes.tabs}>
        <AppleTabs onChange={onTabsChange} />
      </div>
      <Box m="2rem">
        <Typography variant="h5">{selected}</Typography>
      </Box>
    </>
  );
};

export default Landing;
