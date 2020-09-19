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
import { useMutation } from "@apollo/client";
import FormikTextField from "../../components/FormikTextField";
import { ADD_PRODUCT } from "../../graphql/graphql";
import { AddProduct, AddProductVariables } from "../../graphql/types";
import FormikNumberField from "../../components/FormikNumberField";

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

interface Props {
  name: string;
  shortDesc?: string | null;
  desc?: string | null;
  quantity: number;
  price: number;
}

const validation = Yup.object().shape<Props>({
  name: Yup.string().required("Please fill out this field."),
  price: Yup.number()
    .integer()
    .positive()
    .required("Please fill out this field."),
  quantity: Yup.number()
    .integer()
    .positive()
    .required("Please fill out this field."),
});

const ProductCreate: React.FC = () => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [addproduct] = useMutation<AddProduct, AddProductVariables>(
    ADD_PRODUCT
  );
  return (
    <div className={classes.authContainer}>
      <h1 className={classes.red}>Add Product</h1>
      <Formik<Props>
        initialValues={{
          name: "",
          shortDesc: "",
          desc: "",
          quantity: 0,
          price: 0,
        }}
        validationSchema={validation}
        onSubmit={async (values, { setSubmitting }) => {
          setError(false);
          const { data } = await addproduct({ variables: { input: values } });
          if (!data || !data.addProduct.id) setError(true);
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
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="shortDesc"
                name="shortDesc"
                placeholder="shortDesc"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikTextField
                id="desc"
                name="desc"
                placeholder="desc"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikNumberField
                id="quantity"
                name="quantity"
                placeholder="quantity"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormikNumberField
                id="price"
                name="price"
                placeholder="price"
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

export default ProductCreate;
