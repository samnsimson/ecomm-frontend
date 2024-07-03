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
import { Store } from '@/lib/types';
import { useStore } from '@/store';
import { useSession } from 'next-auth/react';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

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
    const { guestId, setGuestId } = useStore<Store>((state) => state);
    const [getCart, { refetch }] = useGetCartLazyQuery();
    const [create] = useCreateCartMutation();
    const [updateItem] = useUpdateCartItemMutation();
    const [removeItem] = useRemoveCartItemMutation();
    const [createItem] = useCreateCartItemMutation();
    const [cart, setCart] = useState<GetCartQuery['cart'] | null | undefined>(initialData);

    const refreshData = async () => {
        const props: { userId?: string; cartId?: string; guestId?: string } = {};
        if (session) props['userId'] = session.user.id;
        if (cart) props['cartId'] = cart.id;
        if (guestId) props['guestId'] = guestId;
        return await refetch(props);
    };

    const createCart = async (input: CreateCartInput) => {
        const { data, errors } = await create({ variables: { input } });
        if (errors) console.log(errors);
        if (data) setGuestId(data.createCart.guestId);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const createCartItem = async (input: CreateCartItemInput) => {
        const { data, errors } = await createItem({ variables: { input } });
        if (errors) console.log(errors);
        if (data) setGuestId(data.createCartItem.guestId);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const updateCartItem = async (input: UpdateCartItemInput) => {
        const { data, errors } = await updateItem({ variables: { input } });
        if (errors) console.log(errors);
        if (data) setGuestId(data.updateCartItem.guestId);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    const removeCartItem = async (input: RemoveCartItemInput) => {
        const { data, errors } = await removeItem({ variables: { input } });
        if (errors) console.log(errors);
        if (data) setGuestId(data.removeCartItem.guestId);
        const { data: cart } = await refreshData();
        if (cart) setCart(cart.cart);
    };

    useLayoutEffect(() => {
        if (initialData) return;
        if (!guestId) return;
        getCart({ variables: { guestId } }).then(({ data }) => data && setCart(data.cart));
    }, [getCart, guestId, initialData]);

    return <CartContext.Provider value={{ cart, createCart, createCartItem, updateCartItem, removeCartItem }}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
