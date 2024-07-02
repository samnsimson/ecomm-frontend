import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme.provider';
import { ApolloClientProvider } from './apollo.provider';
import { NextSessionProvider } from './session.provider';
import { ShippingProvider } from './shipping.provider';
import { CartProvider } from './cart.provider';
import { gql } from '@/lib/graphql-client';
import { GetCartDocument, GetCartQuery, GetCartQueryVariables, GetShippingsDocument, GetShippingsQuery, GetShippingsQueryVariables } from '@/graphql/generated';
import { auth } from '@/lib/auth';

const Providers: FC<PropsWithChildren & Record<string, any>> = async ({ children, params }) => {
    const session = await auth();
    const { data: shippingData } = await gql.request<GetShippingsQuery, GetShippingsQueryVariables>(GetShippingsDocument);
    const { data: cartData } = await gql.fetch<GetCartQuery, GetCartQueryVariables>(GetCartDocument, { ...(session && { userId: session.user.id }) });
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextSessionProvider>
                <ApolloClientProvider>
                    <ShippingProvider initialShippingData={shippingData.shippings}>
                        <CartProvider initialData={cartData.cart}>{children}</CartProvider>
                    </ShippingProvider>
                </ApolloClientProvider>
            </NextSessionProvider>
        </ThemeProvider>
    );
};

export default Providers;
