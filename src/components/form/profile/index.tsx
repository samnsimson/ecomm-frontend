'use client';
import { FC, HTMLAttributes } from 'react';

interface ProfileFormProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ProfileForm: FC<ProfileFormProps> = ({ ...props }) => {
    return <div {...props}></div>;
};
