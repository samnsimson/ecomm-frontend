'use client';
import { BillingInfoInput, PaymentProvider, PaymentType, ShippingInfoInput, useCreateOrderMutation, useCreatePaymentIntentMutation } from '@/graphql/generated';
import { CartData, Store } from '@/lib/types';
import { useStore } from '@/store';
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

export type BillingAndShippingContextType = {
    shippingData: ShippingInfoInput;
    billingData: BillingInfoInput;
    activeForm: 'shipping' | 'billing' | 'payment';
    shippingValid: boolean;
    billingValid: boolean;
    sameAsShipping: boolean;
    clientSecret: string | null;
    creatingOrder: boolean;
    createOrder: (cartData: CartData) => Promise<void>;
    setShippingData: Dispatch<SetStateAction<ShippingInfoInput>>;
    setBillingData: Dispatch<SetStateAction<BillingInfoInput>>;
    setActiveForm: Dispatch<SetStateAction<'shipping' | 'billing' | 'payment'>>;
    setShippingValid: Dispatch<SetStateAction<boolean>>;
    setBillingValid: Dispatch<SetStateAction<boolean>>;
    setSameAsShipping: Dispatch<SetStateAction<boolean>>;
};

export const inititalBillingData: BillingInfoInput = {
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
    email: '',
    phone: '',
};

export const initialShippingData: ShippingInfoInput = {
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
};

export const BillingAndShippingContext = createContext<BillingAndShippingContextType>({
    shippingData: initialShippingData,
    billingData: inititalBillingData,
    activeForm: 'shipping',
    shippingValid: false,
    billingValid: false,
    sameAsShipping: false,
    clientSecret: null,
    creatingOrder: false,
    createOrder: async () => {},
    setShippingData: () => {},
    setBillingData: () => {},
    setActiveForm: () => {},
    setShippingValid: () => {},
    setBillingValid: () => {},
    setSameAsShipping: () => {},
});

export const BillingAndShippingProvider: FC<PropsWithChildren> = ({ children }) => {
    const [shippingData, setShippingData] = useState<ShippingInfoInput>(initialShippingData);
    const [billingData, setBillingData] = useState<BillingInfoInput>(inititalBillingData);
    const [activeForm, setActiveForm] = useState<BillingAndShippingContextType['activeForm']>('shipping');
    const [shippingValid, setShippingValid] = useState<boolean>(false);
    const [billingValid, setBillingValid] = useState<boolean>(false);
    const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [createPaymentIntentMutation] = useCreatePaymentIntentMutation();
    const [createOrderMutation, { loading: creatingOrder }] = useCreateOrderMutation();
    const { setOrderId, setPaymentId } = useStore<Store>((state) => state);

    const createPaymentIntent = async (total: number, orderId: string) => {
        const { data } = await createPaymentIntentMutation({ variables: { input: { total, orderId } } });
        if (data) setClientSecret(data.createPaymentIntent.clientSecret);
    };

    const createOrder = async (cartData: CartData) => {
        const { data, errors } = await createOrderMutation({
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

        console.log('🚀 ~ createOrder ~ errors:', errors);
        // GET THE ORDER ID FROM DB AND CREATE PAYMENT INTENT
        if (data) {
            console.log('🚀 ~ createOrder ~ data:', data);
            setOrderId(data.createOrder.id);
            setPaymentId(data.createOrder.payment.id);
            await createPaymentIntent(data.createOrder.total, data.createOrder.id);
        }
    };

    return (
        <BillingAndShippingContext.Provider
            value={{
                shippingData,
                billingData,
                activeForm,
                shippingValid,
                billingValid,
                sameAsShipping,
                clientSecret,
                creatingOrder,
                createOrder,
                setActiveForm,
                setShippingData,
                setBillingData,
                setShippingValid,
                setBillingValid,
                setSameAsShipping,
            }}
        >
            {children}
        </BillingAndShippingContext.Provider>
    );
};

export const useBillingAndShipping = () => useContext(BillingAndShippingContext);
