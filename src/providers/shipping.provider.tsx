'use client';
import { GetShippingQuery, useGetShippingLazyQuery, useGetShippingsQuery, useUpdateShippingMutation } from '@/graphql/generated';
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

type Shipping = GetShippingQuery['shipping'];

export type ShippingContext = {
    loading: boolean;
    shippings: Array<Shipping>;
    fetchShipping: (id: string) => Promise<Shipping | null>;
    refetch: () => void;
    update: (id: string, input: Partial<Shipping>) => Promise<Shipping | null>;
    context: Shipping | undefined;
    setContext: Dispatch<SetStateAction<Shipping | undefined>>;
};

export const ShippingContext = createContext<ShippingContext>({
    loading: false,
    shippings: [],
    fetchShipping: async () => null,
    refetch: () => {},
    update: async () => null,
    context: undefined,
    setContext: () => null,
});

export const ShippingProvider: FC<PropsWithChildren> = ({ children }) => {
    const [shippings, setShippings] = useState<ShippingContext['shippings']>([]);
    const [context, setContext] = useState<Shipping | undefined>(undefined);
    const { data, loading, refetch: refetchShippings } = useGetShippingsQuery();
    const [getShipping] = useGetShippingLazyQuery();
    const [updateShipping] = useUpdateShippingMutation();

    const fetchShipping = async (id: string) => {
        const { data } = await getShipping({ variables: { id } });
        if (!data) return null;
        return data.shipping;
    };

    const update = async (id: string, input: Partial<Shipping>) => {
        const { data } = await updateShipping({ variables: { input: { id, ...input } } });
        if (!data) return null;
        refetchShippings();
        return data.updateShipping;
    };

    const refetch = () => refetchShippings();

    useEffect(() => {
        if (data) setShippings(data.shippings);
    }, [data]);

    return <ShippingContext.Provider value={{ loading, shippings, context, setContext, fetchShipping, refetch, update }}>{children}</ShippingContext.Provider>;
};

export const useShipping = () => useContext(ShippingContext);
