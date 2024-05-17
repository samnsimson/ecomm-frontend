'use client';
import { useGetUsersQuery } from '@/graphql/generated';
import { FC, HTMLAttributes, useEffect } from 'react';

interface ListUsersProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListUsers: FC<ListUsersProps> = ({ ...props }) => {
    const { data, loading, error } = useGetUsersQuery();

    useEffect(() => {
        if (error) console.log(error);
    }, [error]);

    if (loading) return <p>Loaging...</p>;

    return <div {...props}>{data?.users.map((user) => <p key={user.id}>{user.username}</p>)}</div>;
};
