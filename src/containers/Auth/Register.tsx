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
import cn from "classnames";
import FormikTextField from "../../components/FormikTextField";
import { register } from "./api";

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
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

interface Props {
  email: string;
  name: string;
  password: string;
}

const validation = Yup.object().shape<Props>({
  email: Yup.string().required("Please fill out this field."),
  name: Yup.string().required("Please fill out this field."),
  password: Yup.string().required("Please fill out this field."),
});

const Register: React.FC = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  return (
    <div className={cn(classes.authContainer, classes.center)}>
      <Typography variant="h3">Register</Typography>
      <Formik<Props>
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
                style={{
                  backgroundColor: "rgba(185, 168, 15, 1)",
                  color: "White",
                }}
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

export default Register;
