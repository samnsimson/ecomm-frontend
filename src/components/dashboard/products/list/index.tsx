'use client';
import { Card, CardContent } from '@/components/ui/card';
import { useGetProductsQuery } from '@/graphql/generated';
import { FC, HTMLAttributes } from 'react';

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    page: number;
}

export const ProductList: FC<ProductListProps> = ({ page, ...props }) => {
    const { data } = useGetProductsQuery({ variables: { take: 10, page } });
    return (
        <Card {...props}>
            <CardContent>{data?.products.map((product) => <p key={product.id}>{product.title}</p>)}</CardContent>
        </Card>
    );
};
