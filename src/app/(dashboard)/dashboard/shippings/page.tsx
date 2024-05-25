import { SectionTitle } from '@/components/dashboard/section-title';
import { ShippingForm } from '@/components/form/dashboard/shippings';
import { Card, CardContent } from '@/components/ui/card';

const ShippingsPage = () => {
    return (
        <div className="space-y-6">
            <SectionTitle title="Shippings" description="Manage shippings" />
            <Card>
                <CardContent className="p-6">
                    <ShippingForm />
                </CardContent>
            </Card>
        </div>
    );
};
export default ShippingsPage;
