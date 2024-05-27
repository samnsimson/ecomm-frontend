'use client';
import { Category, CreateCategoryInput, CreateCategoryMutation, useCreateCategoryMutation, useGetCategoriesQuery } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CategoryContextType = {
    loading: boolean;
    categories: Array<Category>;
    create: (input: CreateCategoryInput) => Promise<CreateCategoryMutation['createCategory'] | null | undefined>;
};

export const CategoryContext = createContext<CategoryContextType>({
    loading: false,
    categories: [],
    create: async () => null,
});

export const CategoryProvider: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { data, loading: loadingGetCategories, refetch } = useGetCategoriesQuery();
    const [createCategroy] = useCreateCategoryMutation();
    const categories = useMemo(() => (!data ? [] : data.categories), [data]);

    const create = async (input: CreateCategoryInput) => {
        try {
            const { data } = await createCategroy({ variables: { input } });
            if (!data) return;
            await refetch();
            return data.createCategory;
        } catch (error) {
            console.log('🚀 ~ create ~ error:', error);
        }
    };

    useEffect(() => {
        if (loadingGetCategories) setLoading(true);
        else setLoading(false);
    }, [loadingGetCategories]);

    return <CategoryContext.Provider value={{ loading, categories, create }}>{children}</CategoryContext.Provider>;
};

export const useCategories = () => {
    return useContext(CategoryContext);
};
