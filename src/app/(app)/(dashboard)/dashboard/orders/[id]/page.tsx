import { OrderDetail } from '@/components/dashboard/orders/detail';
import { Page } from '@/components/page';
import { buttonVariants } from '@/components/ui/button';
import { GetOrderDocument, GetOrderQuery, GetOrderQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { cn } from '@/lib/utils';
import { OrderProvider } from '@/providers/order.provider';
import { ArrowLeftIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const PageAction: FC = () => {
    return (
        <Link href="/dashboard/orders" className={cn('flex items-center space-x-2', buttonVariants({ size: 'lg' }))}>
            <ArrowLeftIcon />
            <span>Back to orders</span>
        </Link>
    );
};

const OrderViewPage: NextPage = async ({ params: { id } }: Record<string, any>) => {
    const { data } = await gql.request<GetOrderQuery, GetOrderQueryVariables>(GetOrderDocument, { id });
    if (!data) throw new Error('Order not found');
    return (
        <Page title="Order" description={`ID: ${id}`} action={<PageAction />}>
            <OrderProvider order={data.order}>
                <OrderDetail />
            </OrderProvider>
        </Page>
    );
};
export default OrderViewPage;
