'use client';
import { Button } from '@/components/ui/button';
import { PaymentProvider, PaymentType, useCreateOrderMutation, useCreatePaymentIntentMutation } from '@/graphql/generated';
import { Store } from '@/lib/types';
import { useBillingAndShipping } from '@/providers/billing-and-shipping.provider';
import { useStore } from '@/store';
import { ArrowRightIcon, LoaderIcon } from 'lucide-react';
import { FC, HTMLAttributes, useState } from 'react';
import { toast } from 'sonner';

interface PaymentButtonProps extends HTMLAttributes<HTMLButtonElement> {
    [x: string]: any;
}

export const PaymentButton: FC<PaymentButtonProps> = ({ ...props }) => {
    const [createOrder, { loading }] = useCreateOrderMutation();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const { cartData } = useStore<Store>((state) => state);
    const { shippingValid, billingValid, activeForm, shippingData, billingData } = useBillingAndShipping();
    const enablePaymentButton = shippingValid && billingValid && activeForm === 'payment';

    const handleSubmit = async () => {
        if (cartData) {
            const { data: orderData } = await createOrder({
                variables: {
                    input: {
                        shippingAddress: shippingData,
                        billingAddress: billingData,
                        total: cartData.total,
                        subTotal: cartData.subTotal,
                        taxAmount: cartData.taxAmount,
                        shippingAmount: cartData.shippingAmount,
                        couponAmount: cartData.couponAmount,
                        discountAmount: cartData.discountAmount,
                        paymentType: PaymentType.Card,
                        paymentProvider: PaymentProvider.Stripe,
                        items: cartData.cartItems,
                    },
                },
            });

            if (orderData) {
                const { id: orderId, total } = orderData.createOrder;
                const { data: paymentIntentData } = await createPaymentIntent({ variables: { input: { total, orderId } } });
                if (!paymentIntentData) return toast.error('Payment failed', { description: 'Stripe failed to create a payment intent' });
                const { clientSecret } = paymentIntentData.createPaymentIntent;
                console.log('🚀 ~ handleSubmit ~ clientSecret:', clientSecret);
            }
        }
    };

    return (
        <Button
            size="lg"
            variant="default"
            className="w-full"
            endContent={loading ? <LoaderIcon className="animate-spin" /> : <ArrowRightIcon />}
            {...props}
            disabled={!enablePaymentButton || loading}
            onClick={handleSubmit}
        >
            Continue to payment
        </Button>
    );
};
