import { Checkout } from '@/components/checkout';
import { OrderPreview } from '@/components/form/checkout/order-preview';
import { Page } from '@/components/page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BillingAndShippingProvider } from '@/providers/billing-and-shipping.provider';
import { NextPage } from 'next';

const CheckoutPage: NextPage = () => {
    return (
        <Page title="Checkout" description="Enter shipping and billing information and proceed to payments">
            <BillingAndShippingProvider>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-4 space-y-6">
                        <Checkout />
                    </div>
                    <div className="col-span-2 space-y-6">
                        <Card className="divide-y overflow-hidden">
                            <CardHeader>
                                <CardTitle>Review order</CardTitle>
                                <CardDescription>Review your order</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <OrderPreview />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </BillingAndShippingProvider>
        </Page>
    );
};
export default CheckoutPage;
