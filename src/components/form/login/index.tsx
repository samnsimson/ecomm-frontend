'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { authenticate } from '@/lib/actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useFormState } from 'react-dom';

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const [viewPassword, setViewPassword] = useState(false);
    return (
        <Card className="w-full divide-y-[1px]" {...props}>
            <CardHeader className="bg-neutral-100">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account with username and password</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
                <form action={dispatch} className="space-y-3">
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
            </CardContent>
            <CardFooter className="py-6 text-center">
                <CardDescription className="text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, quam ipsum iste nihil debitis sunt laudantium blanditiis tempore. Et, odit
                    nam!
                </CardDescription>
            </CardFooter>
        </Card>
    );
};
