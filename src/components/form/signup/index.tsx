'use client';
import { signup } from '@/libs/actions';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { useFormState } from 'react-dom';

interface SingupFormProps extends HTMLAttributes<HTMLFormElement> {
    [x: string]: any;
}

export const SingupForm: FC<SingupFormProps> = ({ ...props }) => {
    const [data, dispatch] = useFormState(signup, undefined);
    return (
        <form action={dispatch} {...props} className="space-y-6">
            <Input name="username" type="text" placeholder="Enter username" size="lg" variant="bordered" />
            <Input name="email" type="email" placeholder="Enter email" size="lg" variant="bordered" />
            <Input name="phone" type="tel" placeholder="Enter phone" size="lg" variant="bordered" />
            <Input name="password" type="password" placeholder="Enter password" size="lg" variant="bordered" />
            <Button type="submit" size="lg" color="primary" fullWidth>
                Sign up
            </Button>
            <Button as={Link} href="/sign-in" type="button" size="lg" variant="flat" fullWidth>
                Login if you have an account
            </Button>
        </form>
    );
};
