'use client';
import { useGetProductsQuery } from '@/graphql/generated';
import { FC, HTMLAttributes, useEffect } from 'react';

interface ListUsersProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListUsers: FC<ListUsersProps> = ({ ...props }) => {
    const { data, loading } = useGetProductsQuery();
    if (loading) return <p>Loading...</p>;
    return <div {...props}>{data?.products.map((product) => <p key={product.id}>{product.id}</p>)}</div>;
};
