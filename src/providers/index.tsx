import { FC, PropsWithChildren } from 'react';
import { UIProvider } from './ui-provider';
import { ApolloClientProvider } from './apollo-provider';
import { NextSessionProvider } from './session-provider';
import { StoreProvider } from './store.provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <NextSessionProvider>
            <ApolloClientProvider>
                <StoreProvider>
                    <UIProvider>{children}</UIProvider>
                </StoreProvider>
            </ApolloClientProvider>
        </NextSessionProvider>
    );
};

export default Providers;
