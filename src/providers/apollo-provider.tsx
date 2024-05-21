'use client';
import { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/libs/apollo/client';

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
