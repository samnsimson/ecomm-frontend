'use client';
import { authenticate } from '@/libs/actions';
import { Button, Input } from '@nextui-org/react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
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
            <Input
                type="text"
                name="username"
                isRequired
                radius="sm"
                size="lg"
                variant="bordered"
                placeholder="Enter your username"
                startContent={<User className="text-default-400" />}
            />
            <Input
                type={viewPassword ? 'text' : 'password'}
                name="password"
                isRequired
                radius="sm"
                size="lg"
                variant="bordered"
                placeholder="Enter your password"
                startContent={<Lock className="text-default-400" />}
                endContent={
                    <span onClick={() => setViewPassword(!viewPassword)} className="cursor-pointer">
                        {viewPassword ? <EyeOff className="text-default-400" /> : <Eye className="text-default-400" />}
                    </span>
                }
            />
            <Button type="submit" fullWidth color="primary" size="lg" radius="sm">
                Sign In
            </Button>
            <Button as={Link} href="/sign-up" variant="flat" size="lg" radius="sm" fullWidth>
                Create an account
            </Button>
        </form>
    );
};
