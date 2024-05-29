import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme.provider';
import { ApolloClientProvider } from './apollo.provider';
import { NextSessionProvider } from './session.provider';
import { ShippingProvider } from './shipping.provider';
import { CategoryProvider } from './caetgory.provider';
import { CartProvider } from './cart.provider';

const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextSessionProvider>
                <ApolloClientProvider>
                    <CategoryProvider>
                        <ShippingProvider>
                            <CartProvider>{children}</CartProvider>
                        </ShippingProvider>
                    </CategoryProvider>
                </ApolloClientProvider>
            </NextSessionProvider>
        </ThemeProvider>
    );
};

export default Providers;
