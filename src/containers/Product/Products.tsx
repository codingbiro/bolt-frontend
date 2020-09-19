import { useQuery } from "@apollo/client";
import { makeStyles, Typography, CircularProgress } from "@material-ui/core";
import React from "react";
import { PRODUCTS } from "../../graphql/graphql";
import Product from "../../components/Product";
import {
  Products as ProductsGQL,
  ProductsVariables,
  Products_products as productsProducts,
} from "../../graphql/types";

const useStyles = makeStyles(() => ({
  red: {
    color: "orange",
    marginBottom: "40px",
  },
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const Products: React.FC = () => {
  const classes = useStyles();
  const { loading, data } = useQuery<ProductsGQL, ProductsVariables>(PRODUCTS);
  if (loading)
    return (
      <div className={classes.center}>
        <CircularProgress />
      </div>
    );
  return (
    <>
      <Typography className={classes.red} variant="h2">
        Products
      </Typography>
      {data &&
        data.products.map((product: productsProducts) => (
          <div key={product.id}>
            <Product
              name={product.name}
              price={product.price}
              desc={product.desc}
            />
          </div>
        ))}
      {data && data.products.length === 0 && (
        <Typography className={classes.red} variant="h6">
          No Products
        </Typography>
      )}
    </>
  );
};

export default Products;
