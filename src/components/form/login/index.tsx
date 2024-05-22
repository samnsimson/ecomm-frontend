'use client';
import { authenticate } from '@/libs/actions';
import { Button, Input } from '@nextui-org/react';
import { FC, HTMLAttributes } from 'react';
import { useFormState } from 'react-dom';

interface LoginFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    console.log('🚀 ~ errorMessage:', errorMessage);
    return (
        <form action={dispatch} className="w-full space-y-3">
            {errorMessage && <p>{errorMessage}</p>}
            <Input type="text" name="username" size="lg" variant="bordered" placeholder="Enter your username" />
            <Input type="password" name="password" size="lg" variant="bordered" placeholder="Enter your password" />
            <Button type="submit" fullWidth color="primary" size="lg">
                Sign In
            </Button>
        </form>
    );
};
