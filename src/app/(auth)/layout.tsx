import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

const AuthLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await auth();
    if (!!session?.user && session.user.role === 'user') redirect('/account');
    if (!!session?.user && session.user.role === 'admin') redirect('/dashboard');
    return <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center space-y-6 p-6">{children}</div>;
};

export default AuthLayout;
