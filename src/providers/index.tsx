import { FC, PropsWithChildren } from 'react';
import { UIProvider } from './ui-provider';
import { ApolloClientProvider } from './apollo-provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <UIProvider>
            <ApolloClientProvider>{children}</ApolloClientProvider>
        </UIProvider>
    );
};

export default Providers;
