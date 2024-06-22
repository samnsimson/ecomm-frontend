import { ListCategories } from '@/components/dashboard/categories/list';
import { Page } from '@/components/page';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GetCategoriesDocument, GetCategoriesQuery, GetCategoriesQueryVariables } from '@/graphql/generated';
import { gql } from '@/lib/graphql-client';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FC } from 'react';

const ActionButton: FC = () => (
    <Link href={`dashboard/categories/create`} className={cn('flex items-center space-x-2', buttonVariants({ size: 'lg' }))}>
        <PlusIcon />
        <span>Create new category</span>
    </Link>
);

const CategoriesPage: NextPage = async ({ searchParams }: Record<string, any>) => {
    const { data } = await gql.request<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument);
    if (!data) throw new Error('Error fetching categories');
    return (
        <Page title="Categories" description="Manage all you categories" action={<ActionButton />}>
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                    <CardDescription>View and manage all product categories</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <ListCategories categories={data.categories} />
                </CardContent>
            </Card>
        </Page>
    );
};
export default CategoriesPage;
