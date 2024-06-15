'use client';
import { BillingInfoInput, ShippingInfoInput } from '@/graphql/generated';
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

export type BillingAndShippingContextType = {
    shippingData: ShippingInfoInput;
    billingData: BillingInfoInput;
    activeForm: 'shipping' | 'billing' | 'payment';
    shippingValid: boolean;
    billingValid: boolean;
    sameAsShipping: boolean;
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

    return (
        <BillingAndShippingContext.Provider
            value={{
                shippingData,
                billingData,
                activeForm,
                shippingValid,
                billingValid,
                sameAsShipping,
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
