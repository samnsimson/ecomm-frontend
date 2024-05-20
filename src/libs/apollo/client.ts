import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { cookies } from 'next/headers';

const extractToken = (tokenString: string) => {
    const accessTokenMatch = tokenString.match(/access-token=([^;]+)/);
    const refreshTokenMatch = tokenString.match(/refresh-token=([^;]+)/);
    const accessToken = accessTokenMatch ? accessTokenMatch[1] : null;
    const refreshToken = refreshTokenMatch ? refreshTokenMatch[1] : null;
    return { accessToken, refreshToken };
};

const headers = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        const context = operation.getContext();
        if (context.response && context.response.headers) {
            const cookie = context.response.headers.get('Set-Cookie');
            const { accessToken, refreshToken } = extractToken(cookie);
            accessToken && cookies().set('accessToken', accessToken, { httpOnly: true });
            refreshToken && cookies().set('refreshToken', refreshToken, { httpOnly: true });
        }
        return response;
    });
});

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql', credentials: 'include' });

export const { getClient } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([headers, httpLink]),
        headers: { authorization: `Bearer ${cookies().get('accessToken')}` },
    });
});
