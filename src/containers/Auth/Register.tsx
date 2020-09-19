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
import { register } from "./api";
import { AuthStore, withStores } from "../../stores";

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
    color: "rgb(255,0,0) !important",
    padding: "24px",
    fontWeight: "bold",
  },
}));

interface Form {
  email: string;
  name: string;
  password: string;
}

const validation = Yup.object().shape<Form>({
  email: Yup.string().required("Please fill out this field."),
  name: Yup.string().required("Please fill out this field."),
  password: Yup.string().required("Please fill out this field."),
});

const Register: React.FC<{ authStore: AuthStore }> = ({ authStore }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>{"Redzsiszter"}</h1>
      <Formik<Form>
        initialValues={{
          email: "",
          name: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setError(false);
          const { id } = await register(
            values.email,
            values.name,
            values.password
          );
          if (!id) setError(true);
          setSubmitting(false);
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
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="name"
                name="name"
                type="name"
                placeholder="Name"
                autoComplete="name"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="password"
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
                Register
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
          <Typography>Server error. Please try again.</Typography>
        </Box>
      )}
    </div>
  );
};

export default withStores("authStore")(Register);
