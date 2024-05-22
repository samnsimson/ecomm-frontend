'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { BoxIcon, LogOutIcon, User } from 'lucide-react';
import { signOut } from 'next-auth/react';

export const AccountSidePanel = () => {
    const [selected, setSelected] = useState('profile');
    return (
        <div className="border-default flex flex-col divide-y-[1px] rounded border bg-white p-3">
            <Link
                href="/account/profile"
                className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'h-auto justify-start p-3 hover:bg-primary hover:text-primary-foreground')}
            >
                <span className="flex items-center space-x-3">
                    <User />
                    <span className="flex flex-col">
                        <span className="font-bold">Profile</span>
                        <span className="text-sm">Manage Profile</span>
                    </span>
                </span>
            </Link>
            <Link
                href="/account/orders"
                className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'h-auto justify-start p-3 hover:bg-primary hover:text-primary-foreground')}
            >
                <span className="flex items-center space-x-3">
                    <BoxIcon />
                    <span className="flex flex-col">
                        <span className="font-bold">Orders</span>
                        <span className="text-sm">Manage Orders</span>
                    </span>
                </span>
            </Link>
            <div className="py-3">
                <Button variant="ghost" size="lg" onClick={() => signOut()} className="flex w-full items-center space-x-3">
                    <LogOutIcon className="rotate-180" />
                    <span>Sign out</span>
                </Button>
            </div>
        </div>
    );
};
