import { auth } from '@/lib/auth';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const AuthLayout: NextPage = async ({ children }: any) => {
    const session = await auth();
    if (!!session?.user && session.user.role === 'user') redirect('/account');
    if (!!session?.user && session.user.role === 'admin') redirect('/dashboard');
    return <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center space-y-6 p-6">{children}</div>;
};

export default AuthLayout;
