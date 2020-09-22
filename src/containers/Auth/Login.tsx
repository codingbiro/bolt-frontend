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
import { useHistory } from "react-router";
import { useApolloClient } from "@apollo/client";
import FormikTextField from "../../components/FormikTextField";
import { login } from "./api";
import { useStores } from "../../stores";
import { User, UserVariables } from "../../graphql/types";
import { USER } from "../../graphql/graphql";
import FlashMessage from "../../stores/FlashMessage.model";

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

interface Props {
  email: string;
  password: string;
}

const validation = Yup.object().shape<Props>({
  email: Yup.string().required("Please fill out this field."),
  password: Yup.string().required("Please fill out this field."),
});

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore, contextStore } = useStores();
  const [error, setError] = useState(false);
  const client = useApolloClient();
  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>Coca Cola</h1>
      <Formik<Props>
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setError(false);
          try {
            const { id, email } = await login(values.email, values.password);
            const { data } = await client.query<User, UserVariables>({
              query: USER,
              variables: { id },
            });
            if (data)
              authStore.login({
                id,
                email,
                name: data.user.name,
                isAdmin: data.user.isAdmin,
              });
            contextStore.flash(
              new FlashMessage("login Succeeded", "success", 5000)
            );
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
      {error && (
        <Box>
          <Typography className={classes.error}>Wrong credentials.</Typography>
        </Box>
      )}
    </div>
  );
};

export default Login;
