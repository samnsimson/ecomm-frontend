'use client';
import { FC, HTMLAttributes } from 'react';
import { ProfileForm } from '../form/profile';

interface ProfileComponentProps extends HTMLAttributes<HTMLDivElement> {
    [x: string]: any;
}

export const ProfileComponent: FC<ProfileComponentProps> = ({ ...props }) => {
    return (
        <div {...props} className="py-1">
            <ProfileForm />
        </div>
    );
};
