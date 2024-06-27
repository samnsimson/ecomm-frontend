'use client';
import {
    CreateDiscountInput,
    Discount,
    UpdateDiscountInput,
    useCreateDiscountMutation,
    useGetDiscountsLazyQuery,
    useUpdateDiscountMutation,
} from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

type DiscountContextType = {
    loading: boolean;
    discounts: Discount[];
    create: (input: CreateDiscountInput) => Promise<void>;
    update: (input: UpdateDiscountInput) => Promise<void>;
};

const DiscountContext = createContext<DiscountContextType>({
    loading: false,
    discounts: [],
    create: async () => {},
    update: async () => {},
});

export const DiscountProvider: FC<PropsWithChildren & { initialData: Discount[] }> = ({ children, initialData = [] }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [discounts, setDiscounts] = useState<Discount[]>(initialData);
    const [_, { refetch }] = useGetDiscountsLazyQuery();
    const [createDiscount] = useCreateDiscountMutation();
    const [udpateDiscount] = useUpdateDiscountMutation();

    const create = async (input: CreateDiscountInput) => {
        try {
            setLoading(true);
            await createDiscount({ variables: { input } });
            const { data } = await refetch();
            if (data) setDiscounts(data.discounts);
            toast.success(`Discount created`, { description: 'Discount created successfully' });
        } catch (error) {
            toast.error(`Discount creation failed`);
        } finally {
            setLoading(false);
        }
    };
    const update = async (input: UpdateDiscountInput) => {
        try {
            setLoading(true);
            await udpateDiscount({ variables: { input } });
            const { data } = await refetch();
            if (data) setDiscounts(data.discounts);
            toast.success(`Discount created`, { description: 'Discount created successfully' });
        } catch (error) {
            toast.error(`Discount creation failed`);
        } finally {
            setLoading(false);
        }
    };

    return <DiscountContext.Provider value={{ loading, discounts, create, update }}>{children}</DiscountContext.Provider>;
};

export const useDiscounts = () => useContext(DiscountContext);
