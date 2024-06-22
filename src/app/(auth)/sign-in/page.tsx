import { LoginForm } from '@/components/form/login';
import { NextPage } from 'next';

const SignInPage: NextPage = () => {
    return (
        <div className="flex h-full w-full max-w-xl flex-col items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default SignInPage;
export const dynamic = 'force-dynamic';
