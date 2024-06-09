'use client';
import { CreateTaxInput, GetTaxesQuery, UpdateTaxInput, useCreateTaxMutation, useGetTaxesQuery, useUpdateTaxMutation } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { toast } from 'sonner';

type TaxContext = {
    loading: boolean;
    taxes: GetTaxesQuery['taxes'];
    createTax: (data: CreateTaxInput) => Promise<void>;
    updateTax: (data: UpdateTaxInput) => Promise<void>;
};

export const TaxContext = createContext<TaxContext>({
    taxes: [],
    loading: false,
    createTax: async () => {},
    updateTax: async () => {},
});

export const TaxProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data: taxes, loading, refetch } = useGetTaxesQuery();
    const [create] = useCreateTaxMutation();
    const [update] = useUpdateTaxMutation();

    const createTax = async (data: CreateTaxInput) => {
        try {
            await create({ variables: { input: { ...data, enabled: false } } });
            toast.success('Success', { description: 'Tax created successfully!' });
            refetch();
        } catch (error) {
            toast.error('Oops!', { description: 'Something went wrong' });
        }
    };

    const updateTax = async (data: UpdateTaxInput) => {
        try {
            await update({ variables: { input: data } });
            toast.success('Success', { description: 'Tax updated successfully!' });
            refetch();
        } catch (error) {
            toast.error('Oops!', { description: 'Something went wrong' });
        }
    };

    return <TaxContext.Provider value={{ loading, taxes: taxes ? taxes.taxes : [], createTax, updateTax }}>{children}</TaxContext.Provider>;
};

export const useTaxes = () => useContext(TaxContext);
