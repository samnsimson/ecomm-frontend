'use client';
import { DataTable } from '@/components/data-table';
import { withPagination } from '@/components/hoc/pagination';
import { Badge } from '@/components/ui/badge';
import { GetProductsQuery, useGetProductsQuery } from '@/graphql/generated';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ProductListProps extends HTMLAttributes<HTMLDivElement> {
    page: number;
}

type ProductList = {
    id: string;
    title: string;
    slug: string;
    description: string | null | undefined;
    salePrice: number;
    retailPrice: number;
    brand: string | null | undefined;
    category: Array<string>;
};

const productColumnDefs: Array<ColumnDef<ProductList>> = [
    { accessorKey: 'title', header: 'Product', cell: ({ row: { original } }) => <ProductTitle id={original.id} title={original.title} /> },
    { accessorKey: 'brand', header: 'Brand', cell: ({ row }) => <Badge variant="secondary">{row.original.brand ?? '-'}</Badge> },
    { accessorKey: 'category', header: 'Category', cell: ({ row }) => <ProductCategories categories={row.original.category} /> },
    { accessorKey: 'retailPrice', header: 'Retail Price', size: 120, cell: ({ row }) => `$${row.original.retailPrice}` },
    { accessorKey: 'salePrice', header: 'Sale Price', size: 120, cell: ({ row }) => `$${row.original.salePrice}` },
];

const productData = (data: GetProductsQuery | undefined): Array<ProductList> => {
    if (!data) return [];
    return data.products.map((product) => ({
        id: product.id,
        title: product.title,
        description: product.description,
        slug: product.slug as string,
        salePrice: product.salePrice,
        retailPrice: product.retailPrice,
        brand: product.brand,
        category: product['categories'] ? product.categories.map((cat) => cat.title) : [],
    }));
};

const ProductTitle: FC<{ id: string; title: string }> = ({ id, title }) => {
    return (
        <Link href={`/dashboard/products/edit/${id}`} className="group flex flex-col">
            <span className="text-xs text-secondary-foreground">ID: {id}</span>
            <span className="text-lg font-semibold group-hover:text-primary">{title}</span>
        </Link>
    );
};

const ProductCategories: FC<{ categories: Array<string> }> = ({ categories }) => {
    return null;
};

export const ProductList: FC<ProductListProps> = ({ page, ...props }) => {
    const { data } = useGetProductsQuery({ variables: { take: 10, page } });
    return <DataTable columns={productColumnDefs} data={productData(data)} />;
};

export const ProductListWithPagination = withPagination(ProductList);
