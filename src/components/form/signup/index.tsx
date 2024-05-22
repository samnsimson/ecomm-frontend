'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signup } from '@/lib/actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useFormState } from 'react-dom';

interface SingupFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const SingupForm: FC<SingupFormProps> = ({ ...props }) => {
    const [data, dispatch] = useFormState(signup, undefined);
    const [viewPassword, setViewPassword] = useState(false);
    return (
        <Card className="w-full divide-y-[1px]" {...props}>
            <CardHeader className="bg-neutral-100">
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Sign up for a new account</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
                <form action={dispatch} className="space-y-6">
                    <Input name="username" type="text" placeholder="Enter username" />
                    <Input name="email" type="email" placeholder="Enter email" />
                    <Input name="phone" type="tel" placeholder="Enter phone" />
                    <Input name="password" type={viewPassword ? 'text' : 'password'} placeholder="Enter password" />
                    <Button type="submit" color="primary" className="w-full">
                        Sign up
                    </Button>
                    <Link href="/sign-in" className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'w-full')}>
                        Login if you have an account
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
