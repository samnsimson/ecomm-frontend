import { PageAction, PreviewProduct } from '@/components/dashboard/products/page-action';
import { ProductForm } from '@/components/form/dashboard/product/create';
import { Page } from '@/components/page';
import { GetProductDocument, GetProductQuery, GetProductQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { NextPage } from 'next';
import { FC } from 'react';

const PageActionGroup: FC<{ slug: string }> = ({ slug }) => {
    return (
        <div className="flex items-center space-x-2">
            <PreviewProduct slug={slug} />
            <PageAction />
        </div>
    );
};

const ProductEditPage: NextPage = async ({ params }: Record<string, any>) => {
    const { data } = await gql.request<GetProductQuery, GetProductQueryVariables>(GetProductDocument, { id: params['id'] });
    if (!data) throw new Error('Product not found');
    return (
        <Page title="Edit product" description={`ID: ${params['id']}`} action={<PageActionGroup slug={data.product.slug as string} />}>
            <ProductForm isEditMode product={data.product} />
        </Page>
    );
};
export default ProductEditPage;
