import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  from,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { useHistory } from "react-router-dom";
import GraphqlErrorCodes from "./shared/graphqlErrors";
// import { useStores } from "./stores";

const apiRoot = "http://localhost:6000";

const Apollo: React.FC = ({ children }) => {
  const history = useHistory();
  // const { authStore } = useStores();
  const authStore: any = null;

  const client = new ApolloClient({
    uri: `${apiRoot}graphql`,
    credentials: "include",
    cache: new InMemoryCache(),
    link: from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path, extensions }) => {
            if (extensions && extensions.code === GraphqlErrorCodes.notAuth) {
              history.push("/auth");
            }
            // eslint-disable-next-line no-console
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        }
        if (networkError) {
          if ("statusCode" in networkError && networkError.statusCode === 401) {
            authStore.reset();
          }
        }
      }),
      new HttpLink({
        uri: `${apiRoot}graphql`,
        credentials: "include",
      }),
    ]),
  });
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Apollo;
