'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { ApolloNextAppProvider, NextSSRInMemoryCache, NextSSRApolloClient, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
    const httpLink = new HttpLink({
        uri: 'http://localhost:3000/graphql',
        fetchOptions: { cache: 'no-store' },
    });

    const link = () => {
        const isServer = typeof window === 'undefined';
        return isServer ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), httpLink]) : httpLink;
    };

    return new NextSSRApolloClient({
        headers: { authorization: '' },
        cache: new NextSSRInMemoryCache(),
        link: link(),
    });
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
    return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
