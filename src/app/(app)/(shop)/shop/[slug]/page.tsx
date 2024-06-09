import { Page } from '@/components/page';
import { ProductView } from '@/components/product-view';
import { buttonVariants } from '@/components/ui/button';
import { GetProductDocument, GetProductQuery, GetProductQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';

type NextPageProps = {
    params: { slug: string } & Record<string, string>;
    searchParams: Record<string, string>;
};

const BackLink = () => (
    <Link href="/shop" className={cn('flex items-center space-x-3', buttonVariants({ variant: 'default', size: 'lg' }))}>
        <ArrowLeftIcon /> <span>View all products</span>
    </Link>
);

const ProductPage: NextPage<NextPageProps> = async ({ params }) => {
    const { slug } = params;
    const { data } = await gql.request<GetProductQuery, GetProductQueryVariables>(GetProductDocument, { slug });
    return (
        <Page title="Product" action={<BackLink />}>
            <ProductView product={data.product} />
        </Page>
    );
};
export default ProductPage;
