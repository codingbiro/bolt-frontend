import React from "react";
import { makeStyles, Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { ContextStore, withStores } from "../../stores";

interface Props {
  contextStore: ContextStore;
}

const useStyles = makeStyles(() => ({
  success: {},
  error: {},
  neutral: {},
}));

const FlashMessages: React.FC<Props> = ({ contextStore }) => {
  const classes = useStyles();

  return (
    <>
      {contextStore.flashMessages.map((message) => (
        <Snackbar
          className={classes[message.variant]}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          key={message.id}
          open={message.open}
          autoHideDuration={message.duration}
          onClose={message.close}
          onExited={() => contextStore.removeFlash(message.id)}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={message.content}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={message.close}
            >
              <Close />
            </IconButton>,
          ]}
        />
      ))}
    </>
  );
};

export default withStores("contextStore")(FlashMessages);
