import { ListCategories } from '@/components/dashboard/categories/list';
import { Drawer } from '@/components/drawer';
import { CategoryForm } from '@/components/form/dashboard/categories';
import { Page } from '@/components/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusIcon } from 'lucide-react';
import { NextPage } from 'next';
import { FC } from 'react';

const TriggerComp: FC = () => {
    return (
        <Button size="lg" startContent={<PlusIcon />}>
            Create new category
        </Button>
    );
};

const ActionButton: FC = () => {
    return (
        <Drawer trigger={<TriggerComp />} title="Create Category" description="Create new category" size="medium">
            <CategoryForm action="create" />
        </Drawer>
    );
};

const CategoriesPage: NextPage = async ({ searchParams }: any) => {
    return (
        <Page title="Categories" description="Manage all you categories" action={<ActionButton />}>
            <Card>
                <CardHeader>
                    <CardTitle>All Categories</CardTitle>
                    <CardDescription>View and manage all product categories</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <ListCategories />
                </CardContent>
            </Card>
        </Page>
    );
};
export default CategoriesPage;
export const dynamic = 'force-dynamic';
