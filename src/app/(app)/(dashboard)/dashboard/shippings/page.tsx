import { ShippingsList } from '@/components/dashboard/shippings/list';
import { Drawer } from '@/components/drawer';
import { ShippingForm } from '@/components/form/dashboard/shippings';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';

const Trigger = () => (
    <Button size="lg" startContent={<PlusIcon />}>
        Create new shipping
    </Button>
);

const ShippingsAction = () => {
    return (
        <Drawer title="Create Shipping" description="Create new shipping" trigger={<Trigger />} size="medium">
            <ShippingForm action="create" />
        </Drawer>
    );
};

const ShippingsPage = () => {
    return (
        <Page title="Shippings" description="Manage shippings" action={<ShippingsAction />}>
            <Card>
                <CardHeader>
                    <CardTitle>All shippings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ShippingsList />
                </CardContent>
            </Card>
        </Page>
    );
};
export default ShippingsPage;
export const dynamic = 'force-dynamic';
