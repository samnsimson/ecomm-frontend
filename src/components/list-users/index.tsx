'use client';
import { FC, HTMLAttributes, useEffect } from 'react';

interface ListUsersProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ListUsers: FC<ListUsersProps> = ({ ...props }) => {
    return <div {...props}>Users</div>;
};
