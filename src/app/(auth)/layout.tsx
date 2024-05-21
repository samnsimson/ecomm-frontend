import Logo from '@/components/logo';
import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="mx-auto flex max-w-xl flex-col p-6 min-h-screen justify-center space-y-6">
            <Logo />
            {children}
        </div>
    );
};

export default AuthLayout;
