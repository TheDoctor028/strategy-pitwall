import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { WithChildren } from '../models/common.ts';
import { config } from '../envs/config.ts';

function GraphQLProvider({ children }: WithChildren) {
    const client = new ApolloClient({
        uri: config.GRAPHQL_ENDPOINT,
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default GraphQLProvider;
