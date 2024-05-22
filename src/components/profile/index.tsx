'use client';
import { useGetUserQuery } from '@/graphql/generated';
import { useSession } from 'next-auth/react';
import { FC, HTMLAttributes } from 'react';

interface ProfileComponentProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ProfileComponent: FC<ProfileComponentProps> = ({ ...props }) => {
    const { data: session } = useSession();
    const { data } = useGetUserQuery({ variables: { id: session?.user.id || '' } });
    console.log(data);
    return <div {...props}>ProfileComponent</div>;
};
