'use client';
import { signup } from '@/libs/actions';
import { Button, Input } from '@nextui-org/react';
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react';
import Link from 'next/link';
import { FC, HTMLAttributes, useState } from 'react';
import { useFormState } from 'react-dom';

interface SingupFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

export const SingupForm: FC<SingupFormProps> = ({ ...props }) => {
    const [data, dispatch] = useFormState(signup, undefined);
    const [viewPassword, setViewPassword] = useState(false);
    return (
        <form action={dispatch} {...props} className="space-y-6">
            <Input
                radius="sm"
                isRequired
                name="username"
                type="text"
                placeholder="Enter username"
                size="lg"
                variant="bordered"
                startContent={<User className="text-default-400" />}
            />
            <Input
                radius="sm"
                isRequired
                name="email"
                type="email"
                placeholder="Enter email"
                size="lg"
                variant="bordered"
                startContent={<Mail className="text-default-400" />}
            />
            <Input
                radius="sm"
                isRequired
                name="phone"
                type="tel"
                placeholder="Enter phone"
                size="lg"
                variant="bordered"
                startContent={<Phone className="text-default-400" />}
            />
            <Input
                radius="sm"
                isRequired
                name="password"
                type={viewPassword ? 'text' : 'password'}
                placeholder="Enter password"
                size="lg"
                variant="bordered"
                startContent={<Lock className="text-default-400" />}
                endContent={
                    <span onClick={() => setViewPassword(!viewPassword)} className="cursor-pointer">
                        {viewPassword ? <EyeOff className="text-default-400" /> : <Eye className="text-default-400" />}
                    </span>
                }
            />
            <Button type="submit" size="lg" color="primary" radius="sm" fullWidth>
                Sign up
            </Button>
            <Button as={Link} href="/sign-in" type="button" radius="sm" size="lg" variant="flat" fullWidth>
                Login if you have an account
            </Button>
        </form>
    );
};
