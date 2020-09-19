import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const PRODUCTS = gql`
  query Products($search: String) {
    products(search: $search) {
      id
      name
      price
      desc
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct($input: ProductCreateInput!) {
    addProduct(input: $input) {
      id
    }
  }
`;
