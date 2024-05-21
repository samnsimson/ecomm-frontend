import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getCookie, getCookies } from 'cookies-next';

const getToken = () => {
    const tokens = getCookies();
    console.log('🚀 ~ getToken ~ tokens:', tokens);
    return getCookie('accessToken');
};

export const apolloClient = new ApolloClient({
    uri: String(process.env.NEXT_PUBLIC_GRAPHQL_URL),
    cache: new InMemoryCache(),
    headers: { authorization: `Bearer ${getToken}` },
});
