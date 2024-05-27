'use client';
import { withPagination } from '@/components/hoc/pagination';
import { List, ListItem } from '@/components/list';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCategories } from '@/providers/caetgory.provider';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ListCategoriesProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListCategories: FC<ListCategoriesProps> = ({ ...props }) => {
    const { categories } = useCategories();
    return (
        <Card className="divide-y" {...props}>
            <CardHeader>
                <CardTitle>All Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <List>
                    {categories.map((cat) => (
                        <ListItem key={cat.id} className="prose flex min-w-full items-center justify-between px-6 py-4">
                            <div className="space-y-0.5 ">
                                <h4 className="my-0">{cat.title}</h4>
                                <p className="my-0">{cat.description}</p>
                            </div>
                            <Link
                                href={{ pathname: '/dashboard/categories', query: { action: 'edit' } }}
                                className={cn('space-x-2 no-underline', buttonVariants({ variant: 'ghost' }))}
                            >
                                <PencilIcon size={14} /> <span>Edit</span>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export const ListCategoriesWithPagination = withPagination(ListCategories);
