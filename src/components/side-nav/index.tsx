'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { BookmarkIcon, BoxIcon, LogOutIcon, User } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { SideNavList } from '@/lib/types';

const linkList: Array<SideNavList> = [
    {
        name: 'Profile',
        description: 'Manage your profile',
        link: '/account/profile',
        icon: <User />,
    },
    {
        name: 'Orders',
        description: 'Manage your orders',
        link: '/account/orders',
        icon: <BoxIcon />,
    },
    {
        name: 'Wishlist',
        description: 'View wishlisted items',
        link: '/account/wishlist',
        icon: <BookmarkIcon />,
    },
];

export const SideNav = () => {
    const [selected, setSelected] = useState('profile');
    return (
        <div className="space-y-6">
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                {linkList.map((list, key) => (
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
