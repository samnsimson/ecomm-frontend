'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { LogOutIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { SideNavList } from '@/lib/types';

interface SideNavProps extends HTMLAttributes<HTMLDivElement> {
    navs: Array<SideNavList>;
}

export const SideNav: FC<SideNavProps> = ({ navs }) => {
    const [selected, setSelected] = useState('profile');
    return (
        <div className="space-y-6">
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                {navs.map((list, key) => (
                    <Link
                        key={key}
                        href={list.link}
                        className={cn(
                            buttonVariants({ size: 'lg', variant: 'ghost' }),
                            'h-auto justify-start p-3 hover:bg-primary hover:text-primary-foreground',
                        )}
                    >
                        <span className="flex items-center space-x-3">
                            {list.icon}
                            <span className="flex flex-col">
                                <span className="font-bold">{list.name}</span>
                                <span className="text-xs">{list.description}</span>
                            </span>
                        </span>
                    </Link>
                ))}
            </div>
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    className="w-full"
                    startContent={<LogOutIcon className="rotate-180" />}
                >
                    Sign out
                </Button>
            </div>
        </div>
    );
};
