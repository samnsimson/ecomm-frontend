'use client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

export const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
