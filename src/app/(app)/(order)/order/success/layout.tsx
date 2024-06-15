import { Container } from '@/components/container';
import { NextPage } from 'next';
import { PropsWithChildren } from 'react';

const SuccessLayout: NextPage<PropsWithChildren> = ({ children }) => {
    return <Container className="py-6">{children}</Container>;
};
export default SuccessLayout;
