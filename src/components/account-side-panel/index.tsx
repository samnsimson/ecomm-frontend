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
        <div className="space-y-6">
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                <Link
                    href="/account/profile"
                    className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'h-auto justify-start p-3 hover:bg-primary hover:text-primary-foreground')}
                >
                    <span className="flex items-center space-x-3">
                        <User />
                        <span className="flex flex-col">
                            <span className="font-bold">Profile</span>
                            <span className="text-xs">Manage Profile</span>
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
                            <span className="text-xs">Manage Orders</span>
                        </span>
                    </span>
                </Link>
            </div>
            <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                    className="flex w-full items-center space-x-3"
                >
                    <LogOutIcon className="rotate-180" />
                    <span>Sign out</span>
                </Button>
            </div>
        </div>
    );
};
