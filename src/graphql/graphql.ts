import gql from "graphql-tag";

// eslint-disable-next-line import/prefer-default-export
export const LOGIN = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;
