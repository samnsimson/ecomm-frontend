import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
    return <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center space-y-6 p-6">{children}</div>;
};

export default AuthLayout;
