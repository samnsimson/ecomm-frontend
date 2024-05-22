import { FC, HTMLAttributes } from 'react';
import Logo from '../logo';
import { Container } from '../container';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    return (
        <div className="flex min-h-20 flex-col justify-center bg-transparent py-3" {...props}>
            <Container className="h-full">
                <Logo />
            </Container>
        </div>
    );
};
