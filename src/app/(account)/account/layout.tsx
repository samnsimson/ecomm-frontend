import { SideNav } from '@/components/side-nav';
import { Container } from '@/components/container';
import { FC, PropsWithChildren } from 'react';

const AccountLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="w-1/4">
                <SideNav />
            </div>
            <div className="w-3/4">{children}</div>
        </Container>
    );
};
export default AccountLayout;
