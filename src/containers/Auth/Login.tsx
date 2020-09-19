import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikTextField from "../../components/FormikTextField";
import { login } from "./api";
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
}));

interface Form {
  email: string;
  password: string;
}

const validation = Yup.object().shape<Form>({
  email: Yup.string().required("Please fill out this field."),
  password: Yup.string().required("Please fill out this field."),
});

const Login: React.FC<{ authStore: AuthStore }> = ({ authStore }) => {
  const classes = useStyles();
  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>{"Coca Cola"}</h1>
      <Formik<Form>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          const { email } = await login(values.email, values.password);
          authStore.login({ email });
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
                Login
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
    </div>
  );
};

export default withStores("authStore")(Login);