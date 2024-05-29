'use client';
import { StoreState } from '@/lib/types';
import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren, createContext, useContext, useMemo } from 'react';

type CartContextType = {
    addToCart: (id: string, quantity: number, price: number) => void;
    removeFromCart: (id: string, quantity: number, price: number) => void;
};

const CartContext = createContext<CartContextType>({
    addToCart: () => {},
    removeFromCart: () => {},
});

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { data: session } = useSession();

    const addToCart = (id: string, quantity: number, price: number) => {};
    const removeFromCart = (id: string, quantity: number, price: number) => {};

    return <CartContext.Provider value={{ addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
