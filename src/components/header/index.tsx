'use client';
import { FC, HTMLAttributes } from 'react';
import Logo from '../logo';
import { Container } from '../container';
import { useSession } from 'next-auth/react';
import { User, User2Icon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    const { data } = useSession();
    return (
        <div className="border-default flex min-h-20 flex-col justify-center border-b bg-white py-3" {...props}>
            <Container className="flex h-full items-center justify-between">
                <Logo />
                {!!data?.user && (
                    <Avatar className="ring ring-primary ring-offset-2">
                        <AvatarFallback>
                            <User2Icon />
                        </AvatarFallback>
                    </Avatar>
                )}
            </Container>
        </div>
    );
};
