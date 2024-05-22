import { LoginForm } from '@/components/form/login';
import { FC, HTMLAttributes } from 'react';

interface SignInPageProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const SignInPage: FC<SignInPageProps> = ({ ...props }) => {
    return (
        <div {...props} className="flex h-full w-full max-w-xl flex-col items-center justify-center">
            <LoginForm />
        </div>
    );
};

export default SignInPage;
