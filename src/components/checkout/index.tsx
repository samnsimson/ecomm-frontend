'use client';
import { FC, HTMLAttributes } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShippingInfo } from '@/components/form/checkout/shipping';
import { BillingInfo } from '@/components/form/checkout/billing';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';

interface CheckoutProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Checkout: FC<CheckoutProps> = ({ ...props }) => {
    const { activeForm, shippingValid, billingValid, setActiveForm } = useBillingAndShipping();

    const toggleAccordian = (value: 'shipping' | 'billing') => {
        if (value === 'shipping' && shippingValid) setActiveForm('shipping');
        if (value === 'billing' && billingValid) setActiveForm('billing');
    };

    return (
        <Accordion type="single" collapsible className="space-y-6" value={activeForm}>
            <AccordionItem value="shipping" className="divide-y rounded bg-white" onClick={() => toggleAccordian('shipping')}>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex-col space-y-2 text-left">
                        <CardTitle>Shipping info</CardTitle>
                        <CardDescription>Provide your shipping information</CardDescription>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-6">
                    <ShippingInfo />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="billing" className="divide-y rounded bg-white" onClick={() => toggleAccordian('billing')}>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex-col space-y-2 text-left">
                        <CardTitle>Billing info</CardTitle>
                        <CardDescription>Provide your billing information</CardDescription>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="p-6">
                    <BillingInfo />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};
