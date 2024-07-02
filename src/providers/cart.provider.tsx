'use client';

import {
    CreateCartInput,
    CreateCartItemInput,
    GetCartQuery,
    RemoveCartItemInput,
    UpdateCartItemInput,
    useCreateCartItemMutation,
    useCreateCartMutation,
    useGetCartLazyQuery,
    useRemoveCartItemMutation,
    useUpdateCartItemMutation,
} from '@/graphql/generated';
import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

type CartContextType = {
    cart: GetCartQuery['cart'] | null | undefined;
    createCart: (input: CreateCartInput) => Promise<void>;
    createCartItem: (input: CreateCartItemInput) => Promise<void>;
    updateCartItem: (input: UpdateCartItemInput) => Promise<void>;
    removeCartItem: (input: RemoveCartItemInput) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
    cart: undefined,
    createCart: async () => {},
    createCartItem: async () => {},
    updateCartItem: async () => {},
    removeCartItem: async () => {},
});

export const CartProvider: FC<PropsWithChildren & { initialData: GetCartQuery['cart'] | null | undefined }> = ({ children, initialData }) => {
    const { data: session } = useSession();
    const [_, { refetch }] = useGetCartLazyQuery();
    const [create] = useCreateCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveCartItemMutation();
    const [createItem] = useCreateCartItemMutation();
    const [cart, setCart] = useState<GetCartQuery['cart'] | null | undefined>(initialData);

    const refreshData = async () => {
        const props: { userId?: string; cartId?: string } = {};
        if (session) props['userId'] = session.user.id;
        if (cart) props['cartId'] = cart.id;
        const cartData = await refetch(props);
        return cartData;
    };

    const createCart = async (input: CreateCartInput) => {
        const { errors } = await create({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const createCartItem = async (input: CreateCartItemInput) => {
        const { errors } = await createItem({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const updateCartItem = async (input: UpdateCartItemInput) => {
        const { errors } = await updateItem({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const removeCartItem = async (input: RemoveCartItemInput) => {
        const { errors } = await removeItem({ variables: { input } });
        if (errors) console.log(errors);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    return <CartContext.Provider value={{ cart, createCart, createCartItem, updateCartItem, removeCartItem }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
