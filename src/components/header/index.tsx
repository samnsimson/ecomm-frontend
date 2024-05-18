import { FC, HTMLAttributes } from 'react';
import Logo from '../logo';
import { Container } from '../container';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    return (
        <div className="min-h-20 py-3 bg-transparent flex flex-col justify-center" {...props}>
            <Container className="h-full">
                <Logo />
            </Container>
        </div>
    );
};
