import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from './theme.provider';
import { ApolloClientProvider } from './apollo.provider';
import { NextSessionProvider } from './session.provider';
import { ShippingProvider } from './shipping.provider';
import { CategoryProvider } from './caetgory.provider';
import { CartProvider } from './cart.provider';
import { gql } from '@/lib/graphql-client';
import {
    GetCategoriesDocument,
    GetCategoriesQuery,
    GetCategoriesQueryVariables,
    GetShippingsDocument,
    GetShippingsQuery,
    GetShippingsQueryVariables,
} from '@/graphql/generated';

const Providers: FC<PropsWithChildren & Record<string, any>> = async ({ children, params }) => {
    const { data: categoryData } = await gql.request<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument);
    const { data: shippingData } = await gql.request<GetShippingsQuery, GetShippingsQueryVariables>(GetShippingsDocument);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NextSessionProvider>
                <ApolloClientProvider>
                    <CategoryProvider inititalCategories={categoryData ? categoryData.categories : []}>
                        <ShippingProvider initialShippingData={shippingData.shippings}>
                            <CartProvider>{children}</CartProvider>
                        </ShippingProvider>
                    </CategoryProvider>
                </ApolloClientProvider>
            </NextSessionProvider>
        </ThemeProvider>
    );
};

export default Providers;
