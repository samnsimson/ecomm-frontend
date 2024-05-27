'use client';
import { FC, PropsWithChildren } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo/client';
import { useSession } from 'next-auth/react';

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data } = useSession();
    return <ApolloProvider client={apolloClient(data?.user.accessToken)}>{children}</ApolloProvider>;
};
