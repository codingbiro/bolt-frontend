import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 10,
    minHeight: 44,
  },
  flexContainer: {
    display: "inline-flex",
    position: "relative",
    zIndex: 1,
  },
  scroller: {},
  indicator: {
    top: 3,
    bottom: 3,
    right: 3,
    height: "auto",
    background: "none",
    "&:after": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      left: 4,
      right: 4,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: "#fff",
      boxShadow: "0 4px 12px 0 rgba(0,0,0,0.16)",
    },
  },
  root2: {
    "&:hover": {
      opacity: 1,
    },
    minHeight: 44,
    minWidth: 96,
  },
  wrapper: {
    // zIndex: 2,
    // marginTop: spacing(0.5),
    color: "black",
    textTransform: "initial",
  },
}));

const AppleTabs: React.FC<{ onChange: (i: number) => void }> = ({
  onChange,
}) => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const classes = useStyles();

  const onTabChanged = (i: number) => {
    setTabIndex(i);
    onChange(i);
  };

  return (
    <Tabs
      classes={{
        root: classes.root,
        flexContainer: classes.flexContainer,
        scroller: classes.scroller,
        indicator: classes.indicator,
      }}
      value={tabIndex}
      onChange={(e, index) => onTabChanged(index)}
    >
      <Tab
        classes={{
          root: classes.root2,
          wrapper: classes.wrapper,
        }}
        disableRipple
        label="Online Presence"
      />
      <Tab
        classes={{
          root: classes.root2,
          wrapper: classes.wrapper,
        }}
        disableRipple
        label="Subscription Management"
      />
      <Tab
        classes={{
          root: classes.root2,
          wrapper: classes.wrapper,
        }}
        disableRipple
        label="Reservation Service"
      />
    </Tabs>
  );
};

export default AppleTabs;
