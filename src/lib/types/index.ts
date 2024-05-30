import { ReactNode } from 'react';
import { z } from 'zod';
import { SettingsSchema } from '../zod/schemas';
import { Product } from '@/graphql/generated';

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

export enum ShippingTypes {
    FREE = 'free',
    FLAT = 'flat',
    PERCENTAGE = 'percentage',
}

export type CartType = {
    id: string;
    quantity: number;
    price: number;
};

export type StoreState = {
    settings: z.infer<typeof SettingsSchema>;
    cart: Array<{ id: string; quantity: number }>;
};

export type StoreActions = {
    setSettings: (settings: StoreState['settings']) => void;
    addToCart: (id: string, quantity: number) => void;
    removeFromCart: (id: string, quantity: number) => void;
};

export type Store = StoreState & StoreActions;
