import { Container } from '@/components/container';
import { NextPage } from 'next';
import { PropsWithChildren } from 'react';

const CartLayout: NextPage<PropsWithChildren> = ({ children }) => {
    return <Container>{children}</Container>;
};
export default CartLayout;
