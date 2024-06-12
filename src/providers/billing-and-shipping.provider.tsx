'use client';
import { BillingInfoInput, ShippingInfoInput } from '@/graphql/generated';
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

export type BillingAndShippingContextType = {
    shippingData: ShippingInfoInput;
    billingData: BillingInfoInput;
    sameAsShipping: boolean;
    setShippingData: Dispatch<SetStateAction<ShippingInfoInput>>;
    setBillingData: Dispatch<SetStateAction<BillingInfoInput>>;
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
    sameAsShipping: false,
    setShippingData: () => {},
    setBillingData: () => {},
    setSameAsShipping: () => {},
});

export const BillingAndShippingProvider: FC<PropsWithChildren> = ({ children }) => {
    const [shippingData, setShippingData] = useState<ShippingInfoInput>(initialShippingData);
    const [billingData, setBillingData] = useState<BillingInfoInput>(inititalBillingData);
    const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);

    return (
        <BillingAndShippingContext.Provider value={{ shippingData, billingData, sameAsShipping, setShippingData, setBillingData, setSameAsShipping }}>
            {children}
        </BillingAndShippingContext.Provider>
    );
};

export const useBillingAndShipping = () => useContext(BillingAndShippingContext);
