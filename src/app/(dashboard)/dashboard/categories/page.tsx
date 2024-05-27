import { ListCategoriesWithPagination } from '@/components/dashboard/categories/list';
import { SectionTitle } from '@/components/dashboard/section-title';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

const CategoriesPage = () => {
    return (
        <div className="flex flex-col space-y-6">
            <SectionTitle
                title="Categories"
                description="Manage all you categories"
                action={
                    <Link className={cn('flex space-x-3', buttonVariants({ variant: 'default', size: 'lg' }))} href="/dashboard/categories?action=create">
                        <PlusIcon /> <span>Create New Category</span>
                    </Link>
                }
            />
            <ListCategoriesWithPagination />
        </div>
    );
};
export default CategoriesPage;
