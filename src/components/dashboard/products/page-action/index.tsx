import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

export const PageAction: FC = () => {
    return (
        <Link href="/dashboard/products" className={cn('flex items-center space-x-2', buttonVariants({ size: 'lg' }))}>
            <ArrowLeftIcon />
            <span>View all products</span>
        </Link>
    );
};

export const PreviewProduct: FC<{ slug: string }> = ({ slug }) => {
    return (
        <Link href={`/shop/${slug}`} className={cn('flex items-center space-x-2', buttonVariants({ size: 'iconLg', variant: 'secondary' }))}>
            <ExternalLinkIcon />
        </Link>
    );
};
