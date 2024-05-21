import { LoginForm } from '@/components/form/login';
import { FC, HTMLAttributes } from 'react';

interface SignInPageProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

const SignInPage: FC<SignInPageProps> = ({ ...props }) => {
    return (
        <div {...props} className="h-full flex flex-col items-center justify-center max-w-xl w-full">
            <LoginForm />
        </div>
    );
};

export default SignInPage;
