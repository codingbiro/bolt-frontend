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
import { resetpassword } from "./api";

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
    padding: "24px",
  },
  whiteColor: {
    color: "#fff !important",
  },
  warning: {
    color: "orange",
    padding: "24px",
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
}

const validation = Yup.object().shape<Props>({
  email: Yup.string().required("Please fill out this field."),
});

const ResetPassword: React.FC = () => {
  const classes = useStyles();
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={cn(classes.authContainer, classes.center)}>
      <Typography variant="h3">Reset Your Password</Typography>
      <Formik<Props>
        initialValues={{
          email: "",
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitted(false);
          try {
            await resetpassword(values.email);
            // eslint-disable-next-line no-empty
          } catch (e) {}
          setSubmitted(true);
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
            <Box display="flex" justifyContent="center" py={3}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "rgba(185, 168, 15, 1)",
                  color: "White",
                }}
                className={classes.submit}
              >
                Reset password
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
      {submitted && (
        <Box>
          <Typography className={classes.warning}>
            We have emailed you the details if the given address is associated
            with an account.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default ResetPassword;
