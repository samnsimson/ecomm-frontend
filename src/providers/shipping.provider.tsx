'use client';
import {
    CreateShippingInput,
    GetShippingQuery,
    UpdateShippingInput,
    useCreateShippingMutation,
    useGetShippingsLazyQuery,
    useUpdateShippingMutation,
} from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type Shipping = GetShippingQuery['shipping'];

export type ShippingContext = {
    loading: boolean;
    shippings: Array<Shipping>;
    create: (input: CreateShippingInput) => Promise<void>;
    update: (input: UpdateShippingInput) => Promise<void>;
};

export const ShippingContext = createContext<ShippingContext>({
    loading: false,
    shippings: [],
    create: async () => {},
    update: async () => {},
});

export const ShippingProvider: FC<PropsWithChildren & { initialShippingData: Array<Shipping> }> = ({ children, initialShippingData = [] }) => {
    const [shippings, setShippings] = useState<Array<Shipping>>(initialShippingData);
    const [loading, setLoading] = useState(false);
    const [_, { refetch }] = useGetShippingsLazyQuery();
    const [updateShipping] = useUpdateShippingMutation();
    const [createShipping] = useCreateShippingMutation();

    const create = async (input: CreateShippingInput) => {
        try {
            setLoading(true);
            await createShipping({ variables: { input } });
            await refetchShipping();
        } catch (error) {
            console.log('🚀 ~ create ~ error:', error);
        } finally {
            setLoading(false);
        }
    };

    const update = async (input: UpdateShippingInput) => {
        try {
            setLoading(true);
            await updateShipping({ variables: { input } });
            await refetchShipping();
        } catch (error) {
            console.log('🚀 ~ update ~ error:', error);
        } finally {
            setLoading(false);
        }
    };

    const refetchShipping = async () => {
        const { data } = await refetch();
        setShippings(data.shippings);
    };

    return <ShippingContext.Provider value={{ loading, shippings, create, update }}>{children}</ShippingContext.Provider>;
};

export const useShipping = () => useContext(ShippingContext);
