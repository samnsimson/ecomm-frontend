import { AccountSidePanel } from '@/components/account-side-panel';
import { Container } from '@/components/container';
import { FC, PropsWithChildren } from 'react';

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Container className="flex space-x-6 py-6">
            <div className="w-1/4">
                <AccountSidePanel />
            </div>
            <div className="border-default w-3/4 rounded border bg-white px-3 py-2">{children}</div>
        </Container>
    );
};
export default AccountLayout;
