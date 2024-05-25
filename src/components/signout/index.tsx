'use client';
import { FC, HTMLAttributes } from 'react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';

interface SignOutComponentProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const SignOutComponent: FC<SignOutComponentProps> = ({ ...props }) => {
    return (
        <div className="flex flex-col divide-y-[1px] rounded border border-default bg-white p-3">
            <Button
                variant="secondary"
                size="lg"
                onClick={() => signOut({ callbackUrl: '/', redirect: true })}
                className="w-full"
                startContent={<LogOutIcon className="rotate-180" />}
            >
                Sign out
            </Button>
        </div>
    );
};
