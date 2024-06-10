import { LoginForm } from '@/components/form/login';
import { FC, PropsWithChildren } from 'react';

const SignInPage: FC<PropsWithChildren> = ({}) => {
    return (
        <div className="flex h-full w-full max-w-xl flex-col items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default SignInPage;
