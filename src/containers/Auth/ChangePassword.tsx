import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../components/FormikTextField";
import { changepassword } from "./api";
import useHideNavigation from "../../components/useHideNavigation";
import { parse as queryStringParse } from "query-string";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles(() => ({
  red: {
    color: "red",
  },
  form: {
    width: "100%",
    marginTop: "24px",
  },
  submit: {
    marginTop: "24px",
  },
  authContainer: {
    maxWidth: "600px",
    width: "50%",
    margin: "auto",
  },
  whiteColor: {
    color: "#fff !important",
  },
  error: {
    color: "red",
    padding: "24px",
  },
}));

interface Form {
  password: string;
}

const validation = Yup.object().shape<Form>({
  password: Yup.string().required("Please fill out this field."),
});

const ChangePassword: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  useHideNavigation();
  const { token } = queryStringParse(location.search) as {
    token: string;
  };
  const [error, setError] = useState(false);

  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>{"Set new password"}</h1>
      <Formik<Form>
        initialValues={{
          password: "",
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setError(false);
          try {
            await changepassword(token, values.password);
            setSubmitting(false);
            history.push("/");
          } catch (e) {
            setSubmitting(false);
            setError(true);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            className={classes.form}
          >
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoFocus
                required
              />
            </FormControl>
            <Box display="flex" justifyContent="center" py={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Change Password
                {isSubmitting && (
                  <Box display="flex" alignItems="center" pr={1}>
                    <CircularProgress
                      size={16}
                      thickness={5}
                      color="inherit"
                      className={classes.whiteColor}
                    />
                  </Box>
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      {error && (
        <Box className={classes.error}>
          <Typography>Invalid or expired token.</Typography>
        </Box>
      )}
    </div>
  );
};

export default ChangePassword;
