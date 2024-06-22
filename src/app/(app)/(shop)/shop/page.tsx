import { Page } from '@/components/page';
import { ProductListWithPagination } from '@/components/shop/product/list';
import { GetProductsDocument, GetProductsQuery, GetProductsQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { NextPage } from 'next';

const ShopPage: NextPage = async () => {
    const { data } = await gql.fetch<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument);
    return (
        <Page title="Shop" description="Shop all products">
            <ProductListWithPagination products={data.products} />
        </Page>
    );
};
export default ShopPage;
export const dynamic = 'force-dynamic';
