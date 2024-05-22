'use client';
import { FC, HTMLAttributes } from 'react';
import Logo from '../logo';
import { Container } from '../container';
import { Avatar } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { User } from 'lucide-react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    const { data } = useSession();
    return (
        <div className="flex min-h-20 flex-col justify-center border-b border-default bg-white py-3" {...props}>
            <Container className="flex h-full items-center justify-between">
                <Logo />
                {!!data?.user && <Avatar isBordered showFallback name={data?.user.name} fallback={<User />} />}
            </Container>
        </div>
    );
};
