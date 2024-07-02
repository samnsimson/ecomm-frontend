'use client';

import {
    CreateCartInput,
    GetCartQuery,
    RemoveCartItemInput,
    UpdateCartItemInput,
    useCreateCartMutation,
    useGetCartLazyQuery,
    useRemoveCartItemMutation,
    useUpdateCartItemMutation,
} from '@/graphql/generated';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type CartContextType = {
    cart: GetCartQuery['cart'] | null | undefined;
    createCart: (input: CreateCartInput) => Promise<void>;
    updateCartItem: (input: UpdateCartItemInput) => Promise<void>;
    removeCartItem: (input: RemoveCartItemInput) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
    cart: undefined,
    createCart: async () => {},
    updateCartItem: async () => {},
    removeCartItem: async () => {},
});

export const CartProvider: FC<PropsWithChildren & { initialData: GetCartQuery['cart'] | null | undefined }> = ({ children, initialData }) => {
    const [_, { refetch }] = useGetCartLazyQuery();
    const [create] = useCreateCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveCartItemMutation();
    const [cart, setCart] = useState<GetCartQuery['cart'] | null | undefined>(initialData);

    const createCart = async (input: CreateCartInput) => {
        const { errors } = await create({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refetch();
        if (cart) setCart(cart.cart);
    };

    const updateCartItem = async (input: UpdateCartItemInput) => {
        const { errors } = await updateItem({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refetch();
        if (cart) setCart(cart.cart);
    };

    const removeCartItem = async (input: RemoveCartItemInput) => {
        const { errors } = await removeItem({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refetch();
        if (cart) setCart(cart.cart);
    };

    return <CartContext.Provider value={{ cart, createCart, updateCartItem, removeCartItem }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
