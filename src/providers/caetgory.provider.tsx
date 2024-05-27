'use client';
import { Category, useGetCategoriesQuery } from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useMemo, useState } from 'react';

export type CategoryContextType = {
    loading: boolean;
    categories: Array<Category>;
};

export const CategoryContext = createContext<CategoryContextType>({
    loading: false,
    categories: [],
});

export const CategoryProvider: FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { data, loading: loadingGetCategories } = useGetCategoriesQuery();
    const categories = useMemo(() => (!data ? [] : data.categories), [data]);

    useEffect(() => {
        if (loadingGetCategories) setLoading(true);
        else setLoading(false);
    }, [loadingGetCategories]);

    return <CategoryContext.Provider value={{ loading, categories }}>{children}</CategoryContext.Provider>;
};

export const useCategories = () => {
    return useContext(CategoryContext);
};
