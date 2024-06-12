import { BillingInfo } from '@/components/form/checkout/billing';
import { ShippingInfo } from '@/components/form/checkout/shipping';
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
                        <Card className="divide-y">
                            <CardHeader>
                                <CardTitle>Shipping info</CardTitle>
                                <CardDescription>Provide your shipping information</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <ShippingInfo />
                            </CardContent>
                        </Card>
                        <Card className="divide-y">
                            <CardHeader>
                                <CardTitle>Billing info</CardTitle>
                                <CardDescription>Provide your billing information</CardDescription>
                            </CardHeader>
                            <CardContent className="p-6">
                                <BillingInfo />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Review order</CardTitle>
                                <CardDescription>Review your order</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </BillingAndShippingProvider>
        </Page>
    );
};
export default CheckoutPage;
