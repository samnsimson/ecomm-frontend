'use client';
import {
    Category,
    CreateCategoryInput,
    UpdateCategoryInput,
    useCreateCategoryMutation,
    useGetCategoriesLazyQuery,
    useUpdateCategoryMutation,
} from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

export type CategoryContextType = {
    loading: boolean;
    categories: Array<Category>;
    create: (input: CreateCategoryInput) => Promise<void>;
    update: (input: UpdateCategoryInput) => Promise<void>;
};

export const CategoryContext = createContext<CategoryContextType>({
    loading: false,
    categories: [],
    create: async () => {},
    update: async () => {},
});

export const CategoryProvider: FC<PropsWithChildren & { inititalCategories: Array<Category> }> = ({ children, inititalCategories = [] }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [getCategories, { refetch }] = useGetCategoriesLazyQuery();
    const [createCategroy] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [categories, setCategories] = useState(inititalCategories);

    const update = async (input: UpdateCategoryInput) => {
        try {
            setLoading(true);
            await updateCategory({ variables: { input } });
            const { data } = await refetch();
            setCategories(data.categories);
        } catch (error) {
            console.log('🚀 ~ update ~ error:', error);
        } finally {
            setLoading(false);
        }
    };

    const create = async (input: CreateCategoryInput) => {
        try {
            setLoading(true);
            await createCategroy({ variables: { input } });
            const { data } = await refetch();
            setCategories(data.categories);
        } catch (error) {
            console.log('🚀 ~ create ~ error:', error);
        } finally {
            setLoading(false);
        }
    };

    return <CategoryContext.Provider value={{ loading, categories, create, update }}>{children}</CategoryContext.Provider>;
};

export const useCategories = () => {
    return useContext(CategoryContext);
};
