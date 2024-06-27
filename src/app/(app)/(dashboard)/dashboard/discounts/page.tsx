import { DiscountsList } from '@/components/dashboard/discounts/list';
import { Drawer } from '@/components/drawer';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetDiscountsDocument, GetDiscountsQuery, GetDiscountsQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { DiscountProvider } from '@/providers/discount.provider';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import { FC } from 'react';

const PageAction: FC = () => {
    return (
        <Drawer
            title="Create Discounts"
            description="Create discounts for store"
            size="medium"
            trigger={
                <Button size="lg" startContent={<PlusIcon />}>
                    Create New Discounts
                </Button>
            }
        ></Drawer>
    );
};

const DiscountsPage: NextPage = async () => {
    const { data } = await gql.fetch<GetDiscountsQuery, GetDiscountsQueryVariables>(GetDiscountsDocument);
    if (!data) throw new Error('Unable to get discounts');
    return (
        <DiscountProvider initialData={data.discounts}>
            <Page title="Discounts" description="Create and manage your discounts" action={<PageAction />}>
                <Card>
                    <CardHeader>
                        <CardTitle>All Discounts</CardTitle>
                        <CardDescription>View all discounts from store</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <DiscountsList />
                    </CardContent>
                </Card>
            </Page>
        </DiscountProvider>
    );
};
export default DiscountsPage;
export const dynamic = 'force-dynamic';
