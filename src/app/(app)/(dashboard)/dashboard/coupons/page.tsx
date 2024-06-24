import { CouponsList } from '@/components/coupons/list';
import { Drawer } from '@/components/drawer';
import { CouponForm } from '@/components/form/coupon';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetCouponsDocument, GetCouponsQuery, GetCouponsQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { CouponProvider } from '@/providers/coupon.provider';
import { PlusIcon } from 'lucide-react';

const ActionButton = () => (
    <Button size="lg" startContent={<PlusIcon />}>
        Create new coupon
    </Button>
);

const PageAction = () => {
    return (
        <Drawer title="Create coupon" description="Create your store coupons" trigger={<ActionButton />} size="medium">
            <CouponForm action="create" />
        </Drawer>
    );
};

const CouponsPage = async () => {
    const { data } = await gql.request<GetCouponsQuery, GetCouponsQueryVariables>(GetCouponsDocument);
    if (!data) throw new Error('Unable to fetch coupons');
    return (
        <CouponProvider initialCoupons={data.coupons}>
            <Page title="Coupons" description="Create coupons to be used in store" action={<PageAction />}>
                <Card>
                    <CardHeader>
                        <CardTitle>All coupons</CardTitle>
                        <CardDescription>View all coupons from the store</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CouponsList />
                    </CardContent>
                </Card>
            </Page>
        </CouponProvider>
    );
};
export default CouponsPage;
export const dynamic = 'force-dynamic';
