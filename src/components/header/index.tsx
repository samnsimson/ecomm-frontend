'use client';
import { FC, HTMLAttributes } from 'react';
import Logo from '../logo';
import { Container } from '../container';
import { useSession } from 'next-auth/react';
import { LogInIcon, User2Icon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    const { data } = useSession();
    return (
        <div className="border-default flex min-h-20 flex-col justify-center border-b bg-accent py-3" {...props}>
            <Container className="flex h-full items-center justify-between">
                <Logo />
                <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                        <Link className={cn('uppercase', buttonVariants({ variant: 'ghost', size: 'lg' }))} href="/shop">
                            Shop
                        </Link>
                        <Link className={cn('uppercase', buttonVariants({ variant: 'ghost', size: 'lg' }))} href="/cart">
                            Cart
                        </Link>
                    </div>
                    {!!data?.user ? (
                        <Link href="/account/profile">
                            <Avatar className="ring ring-primary ring-offset-2">
                                <AvatarFallback>
                                    <User2Icon />
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    ) : (
                        <Link href="/sign-in" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'flex space-x-3')}>
                            <LogInIcon /> <span>Sigin in</span>
                        </Link>
                    )}
                </div>
            </Container>
        </div>
    );
};
