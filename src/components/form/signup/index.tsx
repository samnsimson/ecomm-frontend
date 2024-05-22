'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { signupSchema } from '@/lib/zod/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface SingupFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

type SignupSchema = z.infer<typeof signupSchema>;

export const SingupForm: FC<SingupFormProps> = ({ ...props }) => {
    const [viewPassword, setViewPassword] = useState(false);
    const form = useForm<SignupSchema>({ resolver: zodResolver(signupSchema), defaultValues: { username: '', email: '', phone: '', password: '' } });
    const signUp = async (data: SignupSchema) => {
        console.log(data);
    };
    return (
        <Card className="w-full divide-y-[1px]" {...props}>
            <CardHeader className="bg-secondary">
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Sign up for a new account</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(signUp)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="Enter phone" {...field} />
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
                                        <Input type={viewPassword ? 'text' : 'password'} placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" color="primary" className="w-full">
                            Sign up
                        </Button>
                        <Link href="/sign-in" className={cn(buttonVariants({ size: 'lg', variant: 'ghost' }), 'w-full')}>
                            Login if you have an account
                        </Link>
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
