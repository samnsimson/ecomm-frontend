import { FC, PropsWithChildren } from 'react';
import { UIProvider } from './ui-provider';
import { ApolloProvider } from './apollo-provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <UIProvider>
            <ApolloProvider>{children}</ApolloProvider>
        </UIProvider>
    );
};

export default Providers;
