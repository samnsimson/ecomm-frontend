'use client';
import { FC, PropsWithChildren, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo/client';
import { useSession } from 'next-auth/react';

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data, update } = useSession();
    const client = useMemo(() => apolloClient(data, update), [data, update]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
