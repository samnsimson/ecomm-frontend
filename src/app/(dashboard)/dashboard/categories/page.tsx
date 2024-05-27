import { ListCategoriesWithPagination } from '@/components/dashboard/categories/list';
import { SectionTitle } from '@/components/dashboard/section-title';
import { CreateCategoryForm } from '@/components/form/dashboard/categories/create';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

const renderComponent = (param: Map<string, string>): ReactNode | null => {
    const action = param.get('action');
    switch (action) {
        case 'list':
            return <ListCategoriesWithPagination />;
        case 'edit':
            return <></>;
        case 'create':
            return <CreateCategoryForm />;
        default:
            return <ListCategoriesWithPagination />;
    }
};

const renderActionButton = (param: Map<string, string>) => {
    const action = param.get('action');

    const link = ({ path, title }: { path: string; title: string }) => (
        <Link className={cn('flex space-x-3', buttonVariants({ variant: 'default', size: 'lg' }))} href={path}>
            <span>{title}</span>
        </Link>
    );

    switch (action) {
        case 'list':
            return link({ path: '/dashboard/categories?action=create', title: 'Create new category' });
        case 'edit':
            return <></>;
        case 'create':
            return link({ path: '/dashboard/categories?action=list', title: 'View all categories' });
        default:
            return link({ path: '/dashboard/categories?action=create', title: 'Create new category' });
    }
};

const CategoriesPage: NextPage = ({ searchParams }: any) => {
    const sp = new Map<string, string>(Object.entries(searchParams));

    return (
        <div className="flex flex-col space-y-6">
            <SectionTitle title="Categories" description="Manage all you categories" action={renderActionButton(sp)} />
            {renderComponent(sp)}
        </div>
    );
};
export default CategoriesPage;
