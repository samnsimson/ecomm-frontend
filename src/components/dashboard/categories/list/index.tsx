'use client';
import { DataTable } from '@/components/data-table';
import { withPagination } from '@/components/hoc/pagination';
import { badgeVariants } from '@/components/ui/badge';
import { GetCategoriesQuery } from '@/graphql/generated';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ListCategoriesProps extends HTMLAttributes<HTMLDivElement> {
    categories: GetCategoriesQuery['categories'];
}

type CategoryList = {
    id: string;
    title: string;
    description: string;
};

const categoryData = (categories: GetCategoriesQuery['categories']) => {
    return categories.map(({ id, title, description }) => ({ id, title, description: description || '-' }));
};

const columnDefs: Array<ColumnDef<CategoryList>> = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'description', header: 'Description' },
    {
        header: 'Action',
        cell: ({ row: { original } }) => (
            <Link href={`dashboard/categories/edit/${original.id}`} className={cn(badgeVariants({ variant: 'warning' }))}>
                Edit
            </Link>
        ),
    },
];

export const ListCategories: FC<ListCategoriesProps> = ({ categories, ...props }) => {
    return <DataTable columns={columnDefs} data={categoryData(categories)} />;
};

export const ListCategoriesWithPagination = withPagination(ListCategories);
