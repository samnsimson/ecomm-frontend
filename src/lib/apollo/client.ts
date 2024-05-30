import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const apolloClient = (token: string | undefined) => {
    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                ProductOutput: {
                    keyFields: ['id', 'quantity'],
                },
            },
        }),
        link: new HttpLink({
            uri: String(process.env.NEXT_PUBLIC_GRAPHQL_URL),
            headers: { ...(token && { authorization: `Bearer ${token}` }) },
            credentials: 'include',
        }),
    });
};
