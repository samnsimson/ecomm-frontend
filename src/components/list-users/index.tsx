'use client';
import { useGetProductsQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';

interface ListUsersProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListUsers: FC<ListUsersProps> = ({ ...props }) => {
    const { data, loading } = useGetProductsQuery();

    if (loading) return <p>Loaging...</p>;

    return (
        <div {...props}>
            {data?.products.map((product) => (
                <div key={product.id}>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};
