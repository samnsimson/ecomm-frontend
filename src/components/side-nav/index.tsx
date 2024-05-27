'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { buttonVariants } from '../ui/button';
import { SideNavList } from '@/lib/types';
import { SectionTitle } from '../dashboard/section-title';

interface SideNavProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    navs: Array<SideNavList>;
}

export const SideNav: FC<SideNavProps> = ({ navs, title, description }) => {
    return (
        <div className="space-y-6">
            {(title || description) && <SectionTitle title={title ?? ''} description={description} />}
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                {navs.map((list, key) => (
                    <Link
                        key={key}
                        href={list.link}
                        className={cn(
                            buttonVariants({ size: 'lg', variant: 'ghost' }),
                            'group h-auto justify-start p-3 hover:bg-primary hover:text-primary-foreground',
                        )}
                    >
                        <span className="flex items-center space-x-3">
                            {list.icon}
                            <span className="flex flex-col">
                                <span className="font-bold">{list.name}</span>
                                <span className="text-muted-foreground text-xs group-hover:text-primary-foreground">{list.description}</span>
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};
