import gql from "graphql-tag";

export const LOGIN = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
    }
  }
`;
