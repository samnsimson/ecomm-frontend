import { Container } from '@/components/container';
import { FC, PropsWithChildren } from 'react';

const ShopPageLayout: FC<PropsWithChildren> = ({ children }) => {
    return <Container className="py-6">{children}</Container>;
};
export default ShopPageLayout;
