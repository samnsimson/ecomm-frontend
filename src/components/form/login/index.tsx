'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authenticate } from '@/lib/actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useFormState } from 'react-dom';

interface LoginFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [viewPassword, setViewPassword] = useState(false);
    return (
        <form action={dispatch} className="w-full space-y-3">
            {errorMessage && <p>{errorMessage}</p>}
            <Input type="text" name="username" placeholder="Enter your username" />
            <Input type={viewPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" />
            <Button type="submit" color="primary" size="lg" className="w-full">
                Sign In
            </Button>
            <Link href="/sign-up" className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'w-full')}>
                Create an account
            </Link>
        </form>
    );
};
