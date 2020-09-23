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
import cn from "classnames";
import { NavLink } from "react-router-dom";
import FormikTextField from "../../components/FormikTextField";
import { login } from "./api";
import { useStores } from "../../stores";
import { User, UserVariables } from "../../graphql/types";
import { USER } from "../../graphql/graphql";
import FlashMessage from "../../stores/FlashMessage.model";
import urls from "../../const/urls";

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
    padding: "24px",
    margin: "auto",
  },
  whiteColor: {
    color: "#fff !important",
  },
  error: {
    color: "red",
    padding: "16px",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  primary: {
    color: "rgba(185, 168, 15, 1)",
    padding: "12px",
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
    <div className={cn(classes.authContainer, classes.center)}>
      <Typography variant="h3">Login</Typography>
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
                style={{
                  backgroundColor: "rgba(185, 168, 15, 1)",
                  color: "White",
                }}
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
      <div>
        <NavLink to={urls.auth.resetpassword} className={classes.primary}>
          <Typography>Reset Password</Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
