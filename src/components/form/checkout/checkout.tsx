'use client';
import { FC, FormEvent, HTMLAttributes } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CheckoutFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

interface CheckoutFormElementProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export const CheckoutForm: FC<CheckoutFormProps> = ({ ...props }) => {
    return (
        <Elements
            options={{ clientSecret: 'pi_3PQIvCRxuN7gvrMk0Kje5kct_secret_KNvq7N79i1Wfi1ls2LZxuGKjO', appearance: { theme: 'flat' } }}
            stripe={stripePromise}
        >
            <CheckoutFormElement />
        </Elements>
    );
};

export const CheckoutFormElement: FC<CheckoutFormElementProps> = ({ props }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return toast.error('Waiting for payment to load');
        const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: 'http://localhost:3000/order/success' } });
        if (error.type === 'card_error' || error.type === 'validation_error') {
            toast('Payment failed', { description: error.message });
        } else {
            toast('Payment failed', { description: 'An unexpected error occurred.' });
        }
    };

    return (
        <form {...props} onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement id="payment-element" options={{ layout: 'tabs' }} />
            <Button type="submit" size="lg" endContent={<ArrowRightIcon />} className="w-full">
                Make payment
            </Button>
        </form>
    );
};
