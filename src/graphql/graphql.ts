import gql from "graphql-tag";

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

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      isAdmin
    }
  }
`;
