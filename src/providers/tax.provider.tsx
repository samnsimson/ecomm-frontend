'use client';
import { CreateTaxInput, GetTaxesQuery, Tax, UpdateTaxInput, useCreateTaxMutation, useGetTaxesLazyQuery, useUpdateTaxMutation } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type TaxContext = {
    loading: boolean;
    taxes: GetTaxesQuery['taxes'];
    create: (data: CreateTaxInput) => Promise<void>;
    update: (data: UpdateTaxInput) => Promise<void>;
};

export const TaxContext = createContext<TaxContext>({
    taxes: [],
    loading: false,
    create: async () => {},
    update: async () => {},
});

export const TaxProvider: FC<PropsWithChildren & { initialData: Tax[] }> = ({ children, initialData = [] }) => {
    const [loading, setLoading] = useState(false);
    const [getTaxes, { refetch }] = useGetTaxesLazyQuery();
    const [createTax] = useCreateTaxMutation();
    const [updateTax] = useUpdateTaxMutation();
    const [taxes, setTaxes] = useState<Tax[]>(initialData);

    const create = async (input: CreateTaxInput) => {
        try {
            setLoading(true);
            const { errors } = await createTax({ variables: { input } });
            if (errors) throw new Error('Error creating tax');
            const { data } = await refetch();
            if (data) setTaxes(data.taxes);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const update = async (input: UpdateTaxInput) => {
        try {
            setLoading(true);
            const { errors } = await updateTax({ variables: { input } });
            if (errors) throw new Error('Error updating tax');
            const { data } = await refetch();
            if (data) setTaxes(data.taxes);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    return <TaxContext.Provider value={{ loading, taxes, create, update }}>{children}</TaxContext.Provider>;
};

export const useTaxes = () => useContext(TaxContext);
