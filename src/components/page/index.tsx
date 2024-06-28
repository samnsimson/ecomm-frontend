'use client';
import { cn } from '@/lib/utils';
import { FC, HTMLAttributes, ReactNode } from 'react';
import { SectionTitle } from '../dashboard/section-title';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    action?: ReactNode;
}

export const Page: FC<PageProps> = ({ className, children, title, description, action, ...props }) => {
    return (
        <div className={cn('space-y-6', className)} {...props}>
            <SectionTitle title={title} description={description} action={action} />
            <div className="space-y-6">{children}</div>
        </div>
    );
};
