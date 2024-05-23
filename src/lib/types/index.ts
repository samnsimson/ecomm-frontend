import { ReactNode } from 'react';

declare module 'next-auth' {
    interface Session {
        user: {
            name: string;
            email: string;
            sub: string;
            id: string;
            username: string;
            role: string;
            authenticated: boolean;
            accessToken: string;
            refreshToken: string;
        };
    }
}

export type Token = {
    accessToken: string;
    refreshToken: string;
};

export type SideNavList = {
    name: string;
    description: string;
    link: string;
    icon: ReactNode;
};
