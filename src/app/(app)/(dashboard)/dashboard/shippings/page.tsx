import { SectionTitle } from '@/components/dashboard/section-title';
import { ShippingsList } from '@/components/dashboard/shippings/list';
import { ShippingForm } from '@/components/form/dashboard/shippings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShippingsPage = () => {
    return (
        <div className="space-y-6">
            <SectionTitle title="Shippings" description="Manage shippings" />
            <Card>
                <CardContent className="p-6">
                    <ShippingForm />
                </CardContent>
            </Card>
            <Card className="divide-y">
                <CardHeader>
                    <CardTitle>All shippings</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <ShippingsList />
                </CardContent>
            </Card>
        </div>
    );
};
export default ShippingsPage;
