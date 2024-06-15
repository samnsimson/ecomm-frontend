'use client';
import { Button } from '@/components/ui/button';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { ArrowRightIcon } from 'lucide-react';
import { FC, HTMLAttributes, useState } from 'react';

interface PaymentButtonProps extends HTMLAttributes<HTMLButtonElement> {
    [x: string]: any;
}

export const PaymentButton: FC<PaymentButtonProps> = ({ ...props }) => {
    const { shippingValid, billingValid, activeForm } = useBillingAndShipping();
    const enablePaymentButton = shippingValid && billingValid && activeForm === 'payment';
    return (
        <Button size="lg" variant="default" className="w-full" endContent={<ArrowRightIcon />} {...props} disabled={!enablePaymentButton}>
            Continue to payment
        </Button>
    );
};
