import { FC, PropsWithChildren } from 'react';
import { UIProvider } from './ui-provider';
import { ApolloClientProvider } from './apollo-provider';
import { NextSessionProvider } from './session-provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <UIProvider>
            <NextSessionProvider>
                <ApolloClientProvider>{children}</ApolloClientProvider>
            </NextSessionProvider>
        </UIProvider>
    );
};

export default Providers;
