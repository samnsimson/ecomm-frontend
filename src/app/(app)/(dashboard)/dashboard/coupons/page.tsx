import { Drawer } from '@/components/drawer';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const ActionButton = () => (
    <Button size="lg" startContent={<PlusIcon />}>
        Create new coupon
    </Button>
);

const PageAction = () => {
    return <Drawer title="Create coupon" description="Create your store coupons" trigger={<ActionButton />} size="medium"></Drawer>;
};

const CouponsPage = () => {
    return (
        <Page title="Coupons" description="Create coupons to be used in store" action={<PageAction />}>
            CouponsPage
        </Page>
    );
};
export default CouponsPage;
export const dynamic = 'force-dynamic';
