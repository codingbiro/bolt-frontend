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
// import useHideNavigation from "../../components/useHideNavigation";

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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const validation = Yup.object().shape<Form>({
  firstName: Yup.string().required("Please fill out this field."),
  lastName: Yup.string().required("Please fill out this field."),
  email: Yup.string().required("Please fill out this field."),
  password: Yup.string().required("Please fill out this field."),
});

const Default: React.FC = () => {
  const classes = useStyles();
  // useHideNavigation();
  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>Signup</h1>
      <Formik<Form>
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
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
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                autoFocus
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
              />
            </FormControl>
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
                Sign up
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

export default Default;
