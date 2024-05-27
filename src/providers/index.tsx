import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme.provider';
import { ApolloClientProvider } from './apollo.provider';
import { NextSessionProvider } from './session.provider';
import { StoreProvider } from './store.provider';
import { ShippingProvider } from './shipping.provider';
import { CategoryProvider } from './caetgory.provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextSessionProvider>
                <ApolloClientProvider>
                    <StoreProvider>
                        <CategoryProvider>
                            <ShippingProvider>{children}</ShippingProvider>
                        </CategoryProvider>
                    </StoreProvider>
                </ApolloClientProvider>
            </NextSessionProvider>
        </ThemeProvider>
    );
};

export default Providers;
