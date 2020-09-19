import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  from,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const apiRoot = "http://localhost:3332/";

const Apollo: React.FC = ({ children }) => {
  const client = new ApolloClient({
    uri: `${apiRoot}graphql`,
    credentials: "include",
    cache: new InMemoryCache(),
    link: from([
      onError(({ graphQLErrors }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            // eslint-disable-next-line no-console
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
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
