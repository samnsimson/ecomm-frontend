'use client';
import { DataTable } from '@/components/data-table';
import { Drawer } from '@/components/drawer';
import { CategoryForm } from '@/components/form/dashboard/categories';
import { withPagination } from '@/components/hoc/pagination';
import { Badge } from '@/components/ui/badge';
import { GetCategoriesQuery } from '@/graphql/generated';
import { useCategories } from '@/providers/caetgory.provider';
import { ColumnDef } from '@tanstack/react-table';
import { FC, HTMLAttributes } from 'react';

interface ListCategoriesProps extends HTMLAttributes<HTMLDivElement> {}

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
            <Drawer
                trigger={
                    <Badge variant="secondary" className="cursor-pointer">
                        Edit
                    </Badge>
                }
                title="Create Category"
                description="Create new category"
                size="medium"
            >
                <CategoryForm action="edit" id={original.id} />
            </Drawer>
        ),
    },
];

export const ListCategories: FC<ListCategoriesProps> = ({ ...props }) => {
    const { categories } = useCategories();
    return <DataTable columns={columnDefs} data={categoryData(categories)} />;
};

export const ListCategoriesWithPagination = withPagination(ListCategories);
