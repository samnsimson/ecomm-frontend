'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signInSchema } from '@/lib/zod/schemas';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { EyeIcon, EyeOff, LogInIcon } from 'lucide-react';

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type SinginSchema = z.infer<typeof signInSchema>;

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
    const [viewPassword, setViewPassword] = useState(false);
    const form = useForm<SinginSchema>({ resolver: zodResolver(signInSchema), defaultValues: { username: '', password: '' } });
    const { isLoading } = form.formState;
    const authenticate = async ({ username, password }: SinginSchema) => {
        await signIn('credentials', { username, password, redirect: true });
    };

    return (
        <Card className="w-full divide-y-[1px]" {...props}>
            <CardHeader className="bg-secondary">
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Sign in to your account with username and password</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(authenticate)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={viewPassword ? 'text' : 'password'} placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" color="primary" size="lg" className="w-full" disabled={isLoading} startContent={<LogInIcon size={20} />}>
                            Sign In
                        </Button>
                        <div className="flex space-x-3">
                            <Link href="/sign-up" className={cn('w-1/2', buttonVariants({ size: 'lg', variant: 'secondary' }), 'w-full')}>
                                Create an account
                            </Link>
                            <Link href="/password-reset" className={cn('w-1/2', buttonVariants({ size: 'lg', variant: 'secondary' }), 'w-full')}>
                                Forgot password
                            </Link>
                        </div>
                    </form>
                </Form>
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
