import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getCookie } from 'cookies-next';

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: String(process.env.NEXT_PUBLIC_GRAPHQL_URL),
        headers: { authorization: `Bearer ${getCookie('accessToken')}` },
        credentials: 'include',
    }),
});
