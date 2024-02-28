import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {WithChildren} from "../models/common.ts";
import {GRAPHQL_ENDPOINT} from "../envs/config.ts";

export function GraphQLProvider({ children }: WithChildren) {
  const client = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}