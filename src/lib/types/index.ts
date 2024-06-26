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

export type CartDataItem = {
    id: string;
    price: number;
    quantity: number;
    total: number;
};

export type CartData = {
    total: number;
    subTotal: number;
    taxAmount: number;
    discountAmount: number;
    shippingAmount: number;
    couponAmount: number;
    cartItems: Array<CartDataItem>;
};

export type StoreState = {
    settings: z.infer<typeof SettingsSchema>;
    cart: Array<{ id: string; quantity: number }>;
    cartData: CartData | undefined;
    orderId: string | undefined;
    paymentId: string | undefined;
};

export type StoreActions = {
    setSettings: (settings: StoreState['settings']) => void;
    addToCart: (id: string, quantity: number) => void;
    removeFromCart: (id: string, quantity: number) => void;
    setCartData: (data: CartData | undefined) => void;
    setOrderId: (id: string | undefined) => void;
    setPaymentId: (id: string | undefined) => void;
    emptyCart: () => void;
};

export type Store = StoreState & StoreActions;
