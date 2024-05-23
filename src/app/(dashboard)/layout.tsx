import { Container } from '@/components/container';
import { FC, PropsWithChildren } from 'react';

const DashboardLayout: FC<PropsWithChildren> = ({ children, ...props }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="w-1/4"></div>
            <div className="w-3/4">{children}</div>
        </Container>
    );
};
export default DashboardLayout;
